import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './chat.scss';
import { webSocket } from '../api/webSocket';
import { SendMessage } from '../../../features/send-message/components/sendMessage';
import { useAppSelector } from '../../../shared/store/hooks/useAppSelector';
import { scrollToBottom } from './scrollToBottom';
import { WSTypes } from '../../../shared/types/WSTypes';
import { Message } from '../../../entites/message';

interface Props {
  setLastChatId: (id: number) => void;
}

export const Chat: React.FC<Props> = ({ setLastChatId }) => {
  const { id } = useParams<{ id: string | undefined }>();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<any[] | []>([]);
  const user: any = useAppSelector((state) => state.user.user);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const idRef = useRef(id);

  useEffect(() => {
    let chatId = id;
    if (user) {
      webSocket(
        user.login,
        chatId,
        (message) => {
          const { payload, action } = message;
          switch (action) {
            case WSTypes.GetMessages:
              if (payload.chatId == idRef.current) {
                setMessages((prevMessages) => [
                  ...prevMessages,
                  ...payload.messages,
                ]);
              }
              break;
            case WSTypes.AddMessage:
              if (payload.chatId == idRef.current) {
                setMessages((prevMessages) => [
                  ...prevMessages,
                  payload.message,
                ]);
              }
              setLastChatId(payload.chatId);
              break;
          }
        },
        (ws) => {
          setSocket(ws);
        }
      );
    }
  }, [user, id]);

  useEffect(() => {
    setMessages([]);
    idRef.current = id;
  }, [id]);

  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [messages]);

  return (
    <div className="container-chat">
      <div className="partner-info">
        <div className="avatar"></div>
        <div className="info">
          <h2>Partner login</h2>
          <span>last seen recently</span>
        </div>
      </div>
      <div className="chat">
        <div className="container-messages" ref={messagesEndRef}>
          <div className="messages">
            {messages &&
              messages.map((m) => {
                return <Message message={m} />;
              })}
          </div>
        </div>
      </div>
      <div className="container-send-message">
        <SendMessage socket={socket} />
      </div>
    </div>
  );
};
