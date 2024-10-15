import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './chat.scss';
import { webSocket } from '../api/webSocket';
import { SendMessage } from '../../../features/send-message/components/sendMessage';
import { useAppSelector } from '../../../shared/store/hooks/useAppSelector';
import { scrollToBottom } from './scrollToBottom';

export const Chat: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<any[] | []>([]);
  const user: any = useAppSelector((state) => state.user.user);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (user) {
      webSocket(
        user.login,
        id,
        (data) => {
          const { messages } = data;
          setMessages((prevMessages) => [...prevMessages, ...messages]);
        },
        (ws) => {
          setSocket(ws);
        }
      );
    }
  }, [user, id]);

  useEffect(() => {
    setMessages([]);
  }, [id]);

  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [messages]);

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
                    <h4>{m.User.login}</h4>
                    <p>{m.content}</p>
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
