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
import { getTimeFromDate } from '../../../shared/lib/getTimeFromDate';
import { getSuitableDate } from '../../../shared/lib/get-suitable-date/getSuitableDate';

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

  const getAppropriateDate = (date: string) => {
    return getSuitableDate(date) == 'today'
      ? getTimeFromDate(date)
      : getSuitableDate(date);
  };

  return (
    <div className="container-my-chats">
      {chats && (
        <ul className="my-chats">
          {chats.map((chat: any) => {
            if (chat.Messages.length > 0)
              return (
                <li
                  className={`${chat.id == id && 'actual'}`}
                  onClick={() => navigate(`/messenger/${chat.id}`)}
                >
                  <ChatItem
                    login={chat.Users[0].login}
                    message={chat.Messages[0].content}
                    date={getAppropriateDate(chat.updated_at)}
                  />
                </li>
              );
          })}
        </ul>
      )}
    </div>
  );
};
