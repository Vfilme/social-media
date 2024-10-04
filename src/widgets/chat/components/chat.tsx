import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './chat.scss';
import { webSocket } from '../api/webSocket';
import { SendMessage } from '../../../features/send-message/components/sendMessage';
import { MessageChat } from '../types/message';
import { useAppSelector } from '../../../shared/store/hooks/useAppSelector';

interface Props {
  setCurrentPartner: (currentPartner: string) => void;
}

export const Chat: React.FC<Props> = ({ setCurrentPartner }) => {
  const { id } = useParams<{ id: string | undefined }>();
  const [partnerName, setPartnerName] = useState<string | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<MessageChat[] | []>([]);
  const user: any = useAppSelector((state) => state.user.user);

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

  return (
    <div className="chat">
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
      <SendMessage socket={socket} />
    </div>
  );
};
