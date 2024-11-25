import React, { useEffect, useState } from 'react';
import { scrollToBottom } from '../../scrollToBottom';
import './anchor.scss';

interface Props {
  messagesEndRef: any;
}

export const Anchor: React.FC<Props> = ({ messagesEndRef }) => {
  const [anchor, setAnchor] = useState<boolean>(false);

  const handleScrollChat = () => {
    const { scrollTop, scrollHeight, clientHeight } = (messagesEndRef as any)
      .current;
    if (scrollHeight - clientHeight - scrollTop > 100) setAnchor(true);
    else {
      setAnchor(false);
    }
  };

  useEffect(() => {
    const container = messagesEndRef.current;
    container?.addEventListener('scroll', handleScrollChat);
    return () => container?.removeEventListener('scroll', handleScrollChat);
  }, []);

  return (
    <div
      className={`${anchor ? 'active' : ''} anchor`}
      onClick={() => {
        scrollToBottom(messagesEndRef, 'smooth');
      }}
    >
      <svg>
        <path d="M10 1L10 18"></path>
        <path d="M2 12L10 19"></path>
        <path d="M18 12L10 19"></path>
      </svg>
    </div>
  );
};
