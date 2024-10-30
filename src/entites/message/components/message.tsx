import React from 'react';
import { useAppSelector } from '../../../shared/store/hooks/useAppSelector';
import './message.scss';
import { getTime } from '../../../shared/lib/getTime';
import { StatusMessageIcon } from '../../../shared/components';

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
        {user.login == message.User.login ? (
          <StatusMessageIcon status={(message as any).status} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
