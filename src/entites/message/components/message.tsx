import React, { useEffect, useState } from 'react';
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
  const [repliedMessageId, setRepliedMessageId] = useState(0);

  const onIntersection = (entries: any, observer: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        const targetElement = document.querySelector(`#id${repliedMessageId}`);
        (targetElement as any).classList.add('here');
        observer.unobserve(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(onIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });

  useEffect(() => {
    const targetElement = document.querySelector(`#id${repliedMessageId}`);

    if (targetElement) observer.observe(targetElement);

    if (document && repliedMessageId)
      (document as any).querySelector(`#id${repliedMessageId}`).scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });

    setTimeout(() => {
      setRepliedMessageId(0);
      if (targetElement) (targetElement as any).classList.remove('here');
    }, 1000);
  }, [repliedMessageId]);

  return (
    <div
      id={`id${message.id}`}
      className={`${message?.User?.login == user?.login ? 'me' : 'partner'} ${repliedMessageId == message.id ? '' : ''} message`}
      onContextMenu={(e: any) => onRigthClick(e, message)}
    >
      <div className="message-content">
        {(message as any)?.replyTo?.content ? (
          <div
            className="replied-message"
            onClick={() => {
              setRepliedMessageId((message as any).reply_to_message_id);
            }}
          >
            <div className="reply-title">
              <span>{(message as any)?.replyTo?.User?.login}</span>
            </div>
            {(message as any)?.replyTo?.content}
          </div>
        ) : (
          ''
        )}
        {(message as any).type == 'forward' ? (
          <div className="forwared-message">пересланное сообщение</div>
        ) : (
          ''
        )}
        <div className="wrapper">
          <span className="message-content">{message.content}</span>
          <span className={`edited-badge ${message.edited ? '' : 'hide'}`}>
            edited
          </span>
          <span className="message-time">
            {getTimeFromDate(message.sent_at)}
          </span>
          {user.login == message.User.login ? (
            <div className="container-icon-of-message">
              <StatusMessageIcon status={(message as any).status} />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};
