import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './chat.scss';
import { webSocket } from '../api/webSocket';
import { SendMessage } from '../../../features/send-message/components/sendMessage';
import { useAppSelector } from '../../../shared/store/hooks/useAppSelector';
import { scrollToBottom } from './scrollToBottom';
import { WSTypes } from '../../../shared/types/WSTypes';

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

  const getTime = (dateString: string): string => {
    const date = new Date(dateString);

    let wrongHours = date.getHours();
    let correctHours;
    if (wrongHours < 14) {
      correctHours = wrongHours + 10;
    } else {
      correctHours = 10 - (24 - wrongHours);
    }

    const hours = correctHours.toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  };

  return (
    <div className="container-chat">
      <div className="chat">
        <div className="container-messages" ref={messagesEndRef}>
          <div className="messages">
            {messages &&
              messages.map((m) => {
                return (
                  <div
                    className={`${m?.User?.login == user?.login ? 'me' : 'notme'} message`}
                  >
                    <div className="message-content">
                      {m.content}
                      <span className="data">{getTime(m.sent_at)}</span>
                    </div>
                  </div>
                );
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
