import React from 'react';
import { useAppSelector } from '../../../shared/store/hooks/useAppSelector';
import './message.scss';
import { getTimeFromDate } from '../../../shared/lib/getTimeFromDate';
import { StatusMessageIcon } from '../../../shared/components';

interface Props {
  message: {
    User: { login: string };
    content: string;
    sent_at: string;
    edited: boolean;
    id?: number;
  };
  onRigthClick: (e: MouseEvent, message: any) => void;
}

export const Message: React.FC<Props> = ({ message, onRigthClick }) => {
  const user: any = useAppSelector((state) => state.user.user);

  return (
    <div
      className={`${message?.User?.login == user?.login ? 'me' : 'partner'} message`}
      onContextMenu={(e: any) => onRigthClick(e, message)}
    >
      <div className="message-content">
        {message.content}
        <span className={`edited-badge ${message.edited ? '' : 'hide'}`}>
          edited
        </span>
        <span className="message-time">{getTimeFromDate(message.sent_at)}</span>
        {user.login == message.User.login ? (
          <div className="container-icon-of-message">
            <StatusMessageIcon status={(message as any).status} />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
