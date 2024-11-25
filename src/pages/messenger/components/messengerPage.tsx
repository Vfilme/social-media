import React, { useState } from 'react';
import './messangerPage.scss';
import { Chat } from '../../../widgets/chat/chat';
import { MyChats } from '../../../widgets/my-chats';

export const MessengerPage: React.FC = () => {
  const [lastChatId, setLastChatId] = useState<number>(0);
  return (
    <div className="messenger-page">
      <MyChats lastChatId={lastChatId} />
      <Chat setLastChatId={(chatId) => setLastChatId(chatId)} />
    </div>
  );
};
