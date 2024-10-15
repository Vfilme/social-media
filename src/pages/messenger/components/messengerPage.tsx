import React from 'react';
import './messangerPage.scss';
import { Chat } from '../../../widgets/chat/components/chat';
import { MyChats } from '../../../widgets/my-chats';

export const MessengerPage: React.FC = () => {
  return (
    <div className="messenger-page">
      <MyChats />
      <Chat />
    </div>
  );
};
