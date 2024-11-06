import React from 'react';
import './chatItem.scss';

interface Props {
  login: string;
  message: string;
  date: string;
}

export const ChatItem: React.FC<Props> = ({ login, message, date }) => {
  return (
    <>
      <div className="avatar"></div>
      <div className="info">
        <h2>{login}</h2>
        <span>{message}</span>
        <span className="date">{date}</span>
      </div>
    </>
  );
};
