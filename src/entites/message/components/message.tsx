import React from 'react';
import { useAppSelector } from '../../../shared/store/hooks/useAppSelector';
import './message.scss';
import { getTime } from '../../../shared/lib/getTime';

interface Props {
  message: {
    User: { login: string };
    content: string;
    sent_at: string;
  };
}

export const Message: React.FC<Props> = ({ message }) => {
  const user: any = useAppSelector((state) => state.user.user);
  return (
    <div
      className={`${message?.User?.login == user?.login ? 'me' : 'partner'} message`}
    >
      <div className="message-content">
        {message.content}
        <span className="data">{getTime(message.sent_at)}</span>
        {(message as any)?.id ? (
          ''
        ) : (
          <svg className="progress-ring" width="20" height="20">
            <circle className="ring-circle" cx="10" cy="10" r="5" />
            <circle className="ring-slider" cx="10" cy="10" r="1.5" />
          </svg>
        )}
      </div>
    </div>
  );
};
