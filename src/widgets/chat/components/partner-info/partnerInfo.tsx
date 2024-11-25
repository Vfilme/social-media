import React, { useEffect, useState } from 'react';
import { checkOnline } from '../../models/checkOnline';
import { useAppSelector } from '../../../../shared/store/hooks/useAppSelector';
import { WSActionsTypes } from '../../../../shared/types/WSActionsTypes';
import './partnerInfo.scss';
import { useParams } from 'react-router-dom';

interface Props {
  partner: any;
}

export const ParnterInfo: React.FC<Props> = ({ partner }) => {
  const message = useAppSelector((state) => state.websocket.message);
  const { id } = useParams();
  const [onlineUsers, setOnlineUsers] = useState();

  useEffect(() => {
    if (message) {
      const { payload, action } = message;
      if (action == WSActionsTypes.GetOnlineUsers) {
        setOnlineUsers(payload);
      }
    }
  }, [message]);

  return (
    <div className={`${partner && id ? 'active' : ''} partner-info`}>
      <div className="avatar"></div>
      <div className="info">
        <h2>{partner?.login}</h2>
        <span
          className={`${checkOnline(onlineUsers as any, partner?.login as any) ? 'online' : ''}`}
        >
          {checkOnline(onlineUsers as any, partner?.login as any)
            ? 'online'
            : 'offline'}
        </span>
      </div>
    </div>
  );
};
