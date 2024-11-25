import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './chat.scss';
import { SendMessage } from '../../features/send-message/components/sendMessage';
import { useAppSelector } from '../../shared/store/hooks/useAppSelector';
import { scrollToBottom } from './scrollToBottom';
import { WSActionsTypes } from '../../shared/types/WSActionsTypes';
import { Message } from '../../entites/message';
import { Partner } from './types/partner';
import { getSuitableDate } from '../../shared/lib/get-suitable-date/getSuitableDate';
import { deleteMessage } from './models/deleteMessage';
import { changeDateFromEuropeanToGregorian } from '../../shared/lib/changeDateFromEuropeanToGregorian';
import { updateMessagesWithLastMessage } from './models/updateMessagesWithLastMessage';
import { MessageMenu } from './components/message-menu/messageMenu';
import { MessageActions } from './types/messageActions';
import { ChatListModal } from './components/chat-list-modal/chatListModal';
import { ParnterInfo } from './components/partner-info/partnerInfo';
import { Anchor } from './components/anchor/anchor';
import { addMessageToDateGroup } from './models/addMessageToDateGroup';
import { updateMessagesStatus } from './models/updateMessagesStatus';
import { deleteMessageById } from './models/deleteMessageById';
import { updateEditedMessage } from './models/updateEditedMessage';
import { handleGetMessagesAction } from './models/handleGetMessagesAction';
import { addSendingMessage } from './models/addSendingMessage';

interface Props {
  setLastChatId: (id: number) => void;
}

export const Chat: React.FC<Props> = ({ setLastChatId }) => {
  const { id } = useParams<{ id: string | undefined }>();
  const [dateWithMessages, setDateWithMessages] = useState<[] | any[]>([]);
  const user: any = useAppSelector((state) => state.user.user);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatIdRef = useRef(id);
  const [partner, setPartner] = useState<Partner | null>(null);
  const message = useAppSelector((state) => state.websocket.message);
  const socket: any = useAppSelector((state) => state.websocket.socket);
  const [positionMessageMenu, setPositionMessageMenu] = useState({
    x: 0,
    y: 0,
  });
  const [isMessageMenu, setIsMessageMenu] = useState<boolean>(false);
  const [editableMessage, setEditableMessage] = useState<any | null>(null);
  const [activeMessage, setActiveMessage] = useState<any>(null);
  const [isChatListModal, setIsChatListModal] = useState<boolean>(false);

  useEffect(() => {
    if (message) {
      const { payload, action } = message;
      switch (action) {
        case WSActionsTypes.GetMessages: {
          const { dateWithMessages, partner } = handleGetMessagesAction(
            payload,
            chatIdRef.current
          );
          setDateWithMessages(dateWithMessages);
          setPartner((prevPartner: any) => ({ ...prevPartner, ...partner }));
          break;
        }
        case WSActionsTypes.AddMessage: {
          const { message, chatId }: any = payload;
          if (chatId == chatIdRef.current) {
            if (user.login != message.User.login) {
              setDateWithMessages(
                addMessageToDateGroup(dateWithMessages, message)
              );
              const data = JSON.stringify({
                payload: { userLogin: user.login, chatId: id },
                action: WSActionsTypes.UpdateStatusMessage,
              });
              socket.send(data);
            } else {
              setDateWithMessages((prevData) =>
                updateMessagesWithLastMessage(prevData, message)
              );
            }
          }
          setLastChatId(chatId);
          break;
        }
        case WSActionsTypes.UpdateStatusMessage: {
          setDateWithMessages(
            updateMessagesStatus(dateWithMessages, user.login)
          );
          break;
        }
        case WSActionsTypes.DeleteMessage: {
          const { id } = payload;
          setDateWithMessages((prevDateWithMessages) =>
            deleteMessageById(prevDateWithMessages, id)
          );
        }
        case WSActionsTypes.EditMessage: {
          const editedMessage: any = payload;
          setDateWithMessages((prevDateWithMessages) =>
            updateEditedMessage(prevDateWithMessages, editedMessage)
          );
        }
      }
    }
  }, [message]);

  useEffect(() => {
    if (user?.login && !isNaN(Number(id)) && socket) {
      const data = JSON.stringify({
        action: WSActionsTypes.GetMessages,
        payload: { chatId: id, userLogin: user.login },
      });
      if (socket.readyState === WebSocket.OPEN) socket.send(data);
      else if (socket.readyState === WebSocket.CONNECTING) {
        socket.addEventListener('open', () => socket.send(data));
      }
    }
  }, [id, user]);

  useEffect(() => {
    setDateWithMessages([]);
    chatIdRef.current = id;
  }, [id]);

  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [dateWithMessages]);

  const addMessage = (message: any) => {
    const newMessage = {
      User: { login: user.login },
      content: message.content,
      sent_at: new Date(),
      status: 'sending',
      chatId: id,
      type: message.type,
      replyTo: { content: message?.replyToContent },
      reply_to_message_id: message?.reply_to_message_id,
    };

    setDateWithMessages((prevDateWithMessages: any) =>
      addSendingMessage(prevDateWithMessages, newMessage)
    );
  };

  const handleRigthClick = (event: any, message: any) => {
    event.preventDefault();
    setIsMessageMenu(true);
    setActiveMessage(message);
    setPositionMessageMenu({ x: event.clientX, y: event.clientY });
  };

  return (
    <>
      <ChatListModal
        isChatListModal={isChatListModal}
        onClose={() => setIsChatListModal(false)}
        onChatSelect={() => {
          setIsChatListModal(false);
          setEditableMessage({
            ...activeMessage,
            type: MessageActions.Forward,
          });
        }}
      />
      <div className="container-chat">
        <ParnterInfo partner={partner} />
        <div
          className={`container-message-menu ${isMessageMenu ? '' : 'hide'}`}
          onMouseLeave={() => setIsMessageMenu(false)}
          onClick={() => setIsMessageMenu(false)}
        >
          <MessageMenu
            activeMessage={activeMessage}
            positionMessageMenu={positionMessageMenu}
            onClickPoint={(type) => {
              switch (type) {
                case MessageActions.Reply:
                  setEditableMessage({ ...activeMessage, type });
                  break;
                case MessageActions.Edit:
                  setEditableMessage({ ...activeMessage, type });
                  break;
                case MessageActions.Forward:
                  setIsChatListModal(true);
                  break;
                case MessageActions.Delete:
                  deleteMessage(activeMessage.id, id, socket);
                  break;
              }
            }}
          />
        </div>
        <div className="chat">
          {partner && id && <Anchor messagesEndRef={messagesEndRef} />}
          <div className="container-messages" ref={messagesEndRef}>
            <div className="messages">
              {dateWithMessages &&
                dateWithMessages.map(([date, messages]) => {
                  return (
                    messages.length != 0 && (
                      <div className="time-zone">
                        <span className="date">
                          {getSuitableDate(
                            changeDateFromEuropeanToGregorian(date)
                          )}
                        </span>
                        {messages.map((m: any) => {
                          return (
                            <Message
                              message={m}
                              onRigthClick={handleRigthClick}
                            />
                          );
                        })}
                      </div>
                    )
                  );
                })}
            </div>
          </div>
        </div>
        <div className="container-send-message">
          {partner && id && (
            <SendMessage
              editableMessage={editableMessage}
              addMessage={(contentMessage: string) =>
                addMessage(contentMessage)
              }
              removeEditMode={() => {
                setEditableMessage(null);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};
