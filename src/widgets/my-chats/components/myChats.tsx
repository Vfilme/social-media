import './myChats.scss';
import { getChats } from '../model/getChats';
import { useEffect, useState } from 'react';
import React = require('react');
import { useAppSelector } from '../../../shared/store/hooks/useAppSelector';
import { updateChats } from '../model/updateChats';
import { sortChats } from '../model/sortChats';
import { WSActionsTypes } from '../../../shared/types/WSActionsTypes';
import { ChatList } from '../../../entites/chat-item/chatsList';

interface Props {
  lastChatId: number;
}

export const MyChats: React.FC<Props> = ({ lastChatId }) => {
  const [chats, setChats] = useState<any[] | null | any>(null);
  const user: any = useAppSelector((state) => state.user.user);
  const message = useAppSelector((state) => state.websocket.message);

  useEffect(() => {
    if (chats && lastChatId) {
      const updatedChats = updateChats(chats, lastChatId);
      const sortedChats = sortChats(updatedChats);
      setChats(sortedChats);
    }
  }, [lastChatId]);

  const setMyChats = async () => {
    try {
      const chatsWithPartner = await getChats();
      setChats(chatsWithPartner);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      setMyChats();
    }
  }, [user]);

  useEffect(() => {
    if (
      message &&
      user &&
      (message as any).action == WSActionsTypes.AddMessage
    ) {
      setMyChats();
    }
  }, [message]);

  return (
    <div className="container-my-chats">
      <ChatList chats={chats} showActualChat={true} />
    </div>
  );
};
