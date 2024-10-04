import React, { useState } from 'react';
import './messangerPage.scss';
import { MyPartners } from '../../../widgets/my-partners';
import { Chat } from '../../../widgets/chat/components/chat';

export const MessengerPage: React.FC = () => {
  const [currentPartner, setCurrentPartner] = useState<string | null>(null);
  return (
    <div className="messenger">
      <MyPartners partnerName={currentPartner} />
      <Chat
        setCurrentPartner={(currentName) => {
          setCurrentPartner(currentName);
        }}
      />
    </div>
  );
};
