import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './chat.scss';
import { webSocket } from '../api/webSocket';
import { SendMessage } from '../../../features/send-message/components/sendMessage';
import { MessageChat } from '../types/message';
import { useAppSelector } from '../../../shared/store/hooks/useAppSelector';
import { scrollToBottom } from './scrollToBottom';

interface Props {
  setCurrentPartner: (currentPartner: string) => void;
}

export const Chat: React.FC<Props> = ({ setCurrentPartner }) => {
  const { id } = useParams<{ id: string | undefined }>();
  const [partnerName, setPartnerName] = useState<string | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<MessageChat[] | []>([]);
  const user: any = useAppSelector((state) => state.user.user);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (user) {
      webSocket(
        user.id,
        id,
        (data) => {
          const { messages, userName } = data;
          setPartnerName(userName);
          setCurrentPartner(userName);
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
      <div className="container-messages">
        <div className="messages" ref={messagesEndRef}>
          {messages &&
            messages.map((m) => {
              return (
                <div
                  className={`${m.user_id == user?.id ? 'me' : 'notme'} message`}
                >
                  <h4>{user.id == m.user_id ? user.email : partnerName}</h4>
                  <p>{m.content}</p>
                </div>
              );
            })}
        </div>
      </div>
      <div className="container-send-message">
        <SendMessage socket={socket} />
      </div>
    </div>
  );
};
