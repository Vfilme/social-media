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

interface Props {
  setLastChatId: (id: number) => void;
}

export const Chat: React.FC<Props> = ({ setLastChatId }) => {
  const { id } = useParams<{ id: string | undefined }>();
  const [messages, setMessages] = useState<any[] | []>([]);
  const user: any = useAppSelector((state) => state.user.user);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const idRef = useRef(id);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<null | any[]>(null);
  const message = useAppSelector((state) => state.websocket.message);
  const socket: any = useAppSelector((state) => state.websocket.socket);

  useEffect(() => {
    if (message) {
      const { payload, action } = message;
      switch (action) {
        case WSTypes.GetMessages:
          if ((payload as any).chatId == idRef.current) {
            setMessages((prevMessages) => [
              ...prevMessages,
              ...(payload as any).messages,
            ]);
          }
          setPartner((partner: any) => ({
            ...partner,
            login: (payload as any).partnerLogin,
          }));
          break;
        case WSTypes.AddMessage:
          if ((payload as any).chatId == idRef.current) {
            if (user.login != (payload as any).message.User.login) {
              setMessages((prevMessages) => [
                ...prevMessages,
                (payload as any).message,
              ]);
            } else {
              const newMessages = [...messages].map((m) => {
                if (!m?.id) {
                  m = (payload as any).message;
                }
                return m;
              });
              setMessages(newMessages);
            }
          }

          setLastChatId((payload as any).chatId);
          break;
        case WSTypes.GetOnlineUsers:
          setOnlineUsers(payload);
          break;
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
    setMessages([]);
    idRef.current = id;
  }, [id]);

  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [messages]);

  const addMessage = (content: string) => {
    const newMessage = {
      User: { login: user.login },
      user_id: user.id,
      content,
      sent_at: new Date(),
      chatId: id,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
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
        <SendMessage
          addMessage={(contentMessage: string) => addMessage(contentMessage)}
        />
      </div>
    </div>
  );
};
