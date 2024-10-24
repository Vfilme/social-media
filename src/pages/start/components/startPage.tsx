import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../shared/store/hooks/useAppDispatch';
import { setUser } from '../../../shared/store/slices/userSlice';
import { getUser } from '../model/getUser';
import { URL } from '../../../shared/const/urls';
import {
  setMessage,
  setSocket,
} from '../../../shared/store/slices/websocketSlice';
import { useAppSelector } from '../../../shared/store/hooks/useAppSelector';
import { WSTypes } from '../../../shared/types/WSTypes';

export const StartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user: any = useAppSelector((state) => state.user.user);

  const checkUser = async () => {
    const user = await getUser();
    if (user) {
      dispatch(setUser(user));
    } else {
      console.log('user не получен');
      navigate('auth');
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const ws = new WebSocket(URL.BAZE_WS);
    dispatch(setSocket(ws));

    ws.onopen = () => {
      console.log('Соединение с сервером установлено');
      const data = JSON.stringify({
        action: WSTypes.SetConnection,
        payload: { userLogin: user?.login },
      });
      if (user) {
        ws.send(data);
      }
    };

    ws.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      dispatch(setMessage(message));
    };
    ws.onerror = (error: Event) => {
      console.error('Ошибка WebSocket:', error);
    };
    ws.onclose = () => {
      console.log('Соединение с сервером закрыто');
    };
  }, [user]);

  return <Outlet />;
};
