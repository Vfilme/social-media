import React from 'react';
import { ChatItem } from './chatItem';
import { useNavigate, useParams } from 'react-router-dom';
import { getTimeFromDate } from '../../shared/lib/getTimeFromDate';
import { getSuitableDate } from '../../shared/lib/get-suitable-date/getSuitableDate';
import './chatsList.scss';

interface Props {
  chats: any[];
  showActualChat: boolean;
}

export const ChatList: React.FC<Props> = ({ chats, showActualChat }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getAppropriateDate = (date: string) => {
    return getSuitableDate(date) == 'today'
      ? getTimeFromDate(date)
      : getSuitableDate(date);
  };

  return (
    <div className="wrapper-my-chats">
      {chats && (
        <ul className="my-chats">
          {chats.map((chat: any) => {
            if (chat.Messages.length > 0)
              return (
                <li
                  className={`${showActualChat && chat.id == id && 'actual'}`}
                  onClick={() => {
                    navigate(`/messenger/${chat.id}`);
                  }}
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
