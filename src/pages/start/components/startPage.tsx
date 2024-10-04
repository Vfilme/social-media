import axios from 'axios';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './startPage.scss';
import { URL } from '../../../shared/const/urls';
import { useAppDispatch } from '../../../shared/store/hooks/useAppDispatch';
import { setUser } from '../../../shared/store/slices/userSlice';

export const StartPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const checkToken = async () => {
    try {
      const response = await axios.get(`${URL.BAZE}/auth/token`, {
        withCredentials: true,
      });
      const user = response.data.user;
      if (user) {
        console.log('user: ', user);
        dispatch(setUser(user));
      } else {
        console.log('user не получен');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkToken();
  });

  return <Outlet />;
};
