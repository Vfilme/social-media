import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './chat.scss';
import { SendMessage } from '../../../features/send-message/components/sendMessage';
import { useAppSelector } from '../../../shared/store/hooks/useAppSelector';
import { scrollToBottom } from './scrollToBottom';
import { WSTypes } from '../../../shared/types/WSTypes';
import { Message } from '../../../entites/message';
import { Partner } from '../types/partner';
import { checkOnline } from '../models/checkOnline';
import { getSuitableDate } from '../../../shared/lib/get-suitable-date/getSuitableDate';
import { deleteMessage } from '../models/deleteMessage';
import { changeDateFromEuropeanToGregorian } from '../../../shared/lib/changeDateFromEuropeanToGregorian';

interface Props {
  setLastChatId: (id: number) => void;
}

export const Chat: React.FC<Props> = ({ setLastChatId }) => {
  const { id } = useParams<{ id: string | undefined }>();
  const [dateWithMessages, setDateWithMessages] = useState<[] | any[]>([]);
  const user: any = useAppSelector((state) => state.user.user);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const idRef = useRef(id);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<null | any[]>(null);
  const message = useAppSelector((state) => state.websocket.message);
  const socket: any = useAppSelector((state) => state.websocket.socket);
  const [anchor, setAnchor] = useState<boolean>(false);
  const [positionMessageInterface, setPositionMessageInterface] = useState({
    x: 0,
    y: 0,
  });
  const [isActiveMessageInterface, setActiveMessageInterface] =
    useState<boolean>(false);
  const [editableMessage, setEditableMessage] = useState<string | null>(null);
  const [activeMessage, setActiveMessage] = useState<any>(null);

  const handleScrollChat = () => {
    const { scrollTop, scrollHeight, clientHeight } = (messagesEndRef as any)
      .current;
    if (scrollHeight - clientHeight - scrollTop > 100) setAnchor(true);
    else {
      setAnchor(false);
    }
  };

  useEffect(() => {
    const container = messagesEndRef.current;
    container?.addEventListener('scroll', handleScrollChat);
    return () => container?.removeEventListener('scroll', handleScrollChat);
  }, []);

  useEffect(() => {
    if (message) {
      const { payload, action } = message;
      switch (action) {
        case WSTypes.GetMessages: {
          const { dateWithMessages, partnerLogin } = payload;
          if ((payload as any).chatId == idRef.current) {
            setDateWithMessages((prevMessages) => [
              ...prevMessages,
              ...dateWithMessages,
            ]);
          }
          setPartner((partner: any) => ({
            ...partner,
            login: partnerLogin,
          }));
          break;
        }
        case WSTypes.AddMessage: {
          const { chatId } = payload;
          if (chatId == idRef.current) {
            const [date, message] = (payload as any).dateWithMessage;
            if (user.login != message.User.login) {
              const objDateWithMessages = Object.fromEntries(dateWithMessages);
              objDateWithMessages[date] = [
                ...(objDateWithMessages[date] || []),
                message,
              ];
              const newDateWithMessages = Object.entries(objDateWithMessages);
              setDateWithMessages(newDateWithMessages);
              const data = JSON.stringify({
                payload: { userLogin: user.login, chatId: id },
                action: WSTypes.UpdateStatusMessage,
              });
              socket.send(data);
            } else {
              const objDateWithMessages = Object.fromEntries(dateWithMessages);
              objDateWithMessages[date] = objDateWithMessages[date].map(
                (m: any) => {
                  console.log(m?.id);
                  if (!m?.id) {
                    m = { ...message, status: message.status, id: message.id };
                  }
                  return m;
                }
              );
              console.log('MESSAGES: ', objDateWithMessages);
              const newDateWithMessages = Object.entries(objDateWithMessages);
              setDateWithMessages(newDateWithMessages);
            }
          }

          setLastChatId(chatId);
          break;
        }
        case WSTypes.GetOnlineUsers: {
          setOnlineUsers(payload);
          break;
        }
        case WSTypes.UpdateStatusMessage: {
          const newDateWithMessages = [...dateWithMessages].map(
            ([_, message]) => {
              return [
                _,
                message.map((m: any) => {
                  if (m.User.login == user.login) {
                    m = { ...m, status: 'read' };
                  }
                  return m;
                }),
              ];
            }
          );
          setDateWithMessages(newDateWithMessages);
          break;
        }
        case 'deleteMessage': {
          const { id } = payload;
          setDateWithMessages((prevDateWithMessages) =>
            prevDateWithMessages.map(([_, messages]) => {
              return [
                _,
                messages.filter((m: any) => {
                  return m.id != id;
                }),
              ];
            })
          );
        }
        case 'editMessage': {
          const editMessage: any = payload;
          setDateWithMessages((prevDateWithMessages) =>
            prevDateWithMessages.map(([_, messages]) => {
              return [
                _,
                messages.map((m: any) => {
                  if (m.id == (editMessage as any)?.id) m = { ...editMessage };
                  return m;
                }),
              ];
            })
          );
        }
      }
    }
  }, [message]);

  useEffect(() => {
    if (user?.login && !isNaN(Number(id)) && socket) {
      const data = JSON.stringify({
        action: WSTypes.GetMessages,
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
    idRef.current = id;
  }, [id]);

  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [dateWithMessages]);

  const addMessage = (content: string) => {
    const newMessage = {
      User: { login: user.login },
      content,
      sent_at: new Date(),
      status: 'sending',
      chatId: id,
    };
    const objDateWithMessages = Object.fromEntries(dateWithMessages);
    const currentDate = new Date().toLocaleDateString();

    objDateWithMessages[currentDate] = [
      ...(objDateWithMessages[currentDate] || []),
      newMessage,
    ];
    const newDateWithMessages = objDateWithMessages;
    setDateWithMessages(Object.entries(newDateWithMessages));
  };

  const handleRigthClick = (event: any, message: any) => {
    event.preventDefault();
    if (message?.User.login == user.login) {
      setActiveMessageInterface(true);
      setActiveMessage(message);
      setPositionMessageInterface({ x: event.clientX, y: event.clientY });
    }
  };

  return (
    <div className="container-chat">
      <div className={`${partner ? 'active' : ''} partner-info`}>
        <div className="avatar"></div>
        <div className="info">
          <h2>{partner?.login}</h2>
          <span
            className={`${checkOnline(onlineUsers as any, partner?.login as any) ? 'online' : ''}`}
          >
            {checkOnline(onlineUsers as any, partner?.login as any)
              ? 'online'
              : 'offline'}
          </span>
        </div>
      </div>
      <div
        className={`interface-message ${isActiveMessageInterface ? '' : 'hide'}`}
        onMouseLeave={() => setActiveMessageInterface(false)}
        onClick={() => setActiveMessageInterface(false)}
        style={{
          left: `${positionMessageInterface.x}px`,
          top: `${positionMessageInterface.y}px`,
        }}
      >
        <ul>
          <li onClick={() => deleteMessage(activeMessage.id, id, socket)}>
            удалить
          </li>
          <li onClick={() => setEditableMessage(activeMessage)}>
            редактировать
          </li>
        </ul>
      </div>
      <div className="chat">
        {partner && (
          <div
            className={`${anchor ? 'active' : ''} anchor`}
            onClick={() => {
              scrollToBottom(messagesEndRef, 'smooth');
            }}
          >
            <svg>
              <path d="M10 1L10 18"></path>
              <path d="M2 12L10 19"></path>
              <path d="M18 12L10 19"></path>
            </svg>
          </div>
        )}
        <div className="container-messages" ref={messagesEndRef}>
          <div className="messages">
            {dateWithMessages &&
              dateWithMessages.map(([date, messages]) => {
                return (
                  <div className="time-zone">
                    <span className="date">
                      {getSuitableDate(changeDateFromEuropeanToGregorian(date))}
                    </span>
                    {messages.map((m: any) => {
                      return (
                        <Message message={m} onRigthClick={handleRigthClick} />
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="container-send-message">
        {partner && (
          <SendMessage
            editableMessage={editableMessage}
            addMessage={(contentMessage: string) => addMessage(contentMessage)}
            removeEditMode={() => {
              setEditableMessage(null);
            }}
          />
        )}
      </div>
    </div>
  );
};
