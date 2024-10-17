import { useNavigate, useParams } from 'react-router-dom';
import './myChats.scss';
import { getUsers } from '../model/getUsers';
import { useEffect, useState } from 'react';
import React = require('react');
import { useAppSelector } from '../../../shared/store/hooks/useAppSelector';
import { updateChats } from '../model/updateChats';
import { sortChats } from '../model/sortChats';

interface Props {
  lastChatId: number;
}

export const MyChats: React.FC<Props> = ({ lastChatId }) => {
  const { id } = useParams();
  const [chats, setChats] = useState<any[] | null | any>(null);
  const user: any = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (chats && lastChatId) {
      const updatedChats = updateChats(chats, lastChatId);
      const sortedChats = sortChats(updatedChats);
      setChats(sortedChats);
    }
  }, [lastChatId]);

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const chatsWithPartner = await getUsers();
          setChats(chatsWithPartner);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [user]);

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
                <span>{chat.Users[0].login}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
