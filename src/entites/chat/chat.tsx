import React from 'react';
import './chat.scss';

interface Props {
  login: string;
  message: string;
  time: string;
}

export const Chat: React.FC<Props> = ({ login, message, time }) => {
  return (
    <>
      <div className="avatar"></div>
      <div className="info">
        <h2>{login}</h2>
        <span>{message}</span>
        <span className="time">{time}</span>
      </div>
    </>
  );
};
