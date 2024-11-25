import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../shared/store/hooks/useAppSelector';
import { getChats } from '../../../my-chats/model/getChats';
import { WSActionsTypes } from '../../../../shared/types/WSActionsTypes';
import './chatListModal.scss';
import { ChatList } from '../../../../entites/chat-item/chatsList';

interface Props {
  isChatListModal: boolean;
  onChatSelect: () => void;
  onClose: () => void;
}

export const ChatListModal: React.FC<Props> = ({
  isChatListModal,
  onChatSelect,
  onClose,
}) => {
  const [chats, setChats] = useState<any[] | null | any>(null);
  const message = useAppSelector((state) => state.websocket.message);
  const user = useAppSelector((state) => state.user.user);

  const setMyChats = async () => {
    try {
      const chatsWithPartner = await getChats();
      setChats(chatsWithPartner);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      message &&
      user &&
      (message as any).action == WSActionsTypes.AddMessage
    ) {
      setMyChats();
    }
  }, [message]);

  useEffect(() => {
    if (user) {
      setMyChats();
    }
  }, [user]);

  return (
    <div
      className={`background-my-chats-forward ${!isChatListModal ? 'hide' : ''}`}
    >
      <div className="chat-list-modal">
        <div className="button-close" onClick={() => onClose()}>
          <svg>
            <path d="M2 18L18 2"></path>
            <path d="M2 2L18 18"></path>
          </svg>
        </div>
        <div
          className="container-my-chats-forward"
          onClick={() => onChatSelect()}
        >
          <ChatList chats={chats} showActualChat={false} />
        </div>
      </div>
    </div>
  );
};
