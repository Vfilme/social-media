import { useNavigate, useParams } from 'react-router-dom';
import './myChats.scss';
import { getChats } from '../model/getChats';
import { useEffect, useState } from 'react';
import React = require('react');
import { useAppSelector } from '../../../shared/store/hooks/useAppSelector';
import { updateChats } from '../model/updateChats';
import { sortChats } from '../model/sortChats';
import { ChatItem } from '../../../entites/chat-item';
import { WSTypes } from '../../../shared/types/WSTypes';

interface Props {
  lastChatId: number;
}

export const MyChats: React.FC<Props> = ({ lastChatId }) => {
  const { id } = useParams();
  const [chats, setChats] = useState<any[] | null | any>(null);
  const user: any = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const message = useAppSelector((state) => state.websocket.message);

  useEffect(() => {
    if (chats && lastChatId) {
      const updatedChats = updateChats(chats, lastChatId);
      const sortedChats = sortChats(updatedChats);
      setChats(sortedChats);
    }
  }, [lastChatId]);

  const setMyChats = async () => {
    try {
      const chatsWithPartner = await getChats();
      setChats(chatsWithPartner);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      setMyChats();
    }
  }, [user]);

  useEffect(() => {
    if (message && user && (message as any).action == WSTypes.AddMessage) {
      setMyChats();
    }
  }, [message]);

  return (
    <div className="my-chats">
      {chats && (
        <ul>
          {chats.map((chat: any) => {
            return (
              <li
                className={`${chat.id == id && 'actual'}`}
                onClick={() => navigate(`/messenger/${chat.id}`)}
              >
                <ChatItem
                  login={chat.Users[0].login}
                  message="Hello, happy birthday!" //mock data
                  time={'20:45'} //moсk data
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
