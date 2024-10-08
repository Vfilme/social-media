import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../shared/store/hooks/useAppDispatch';
import { setUser } from '../../../shared/store/slices/userSlice';
import { getUser } from '../model/getUser';

export const StartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const checkUser = async () => {
    const user = await getUser();
    if (user) {
      dispatch(setUser(user));
      console.log('user: ', user);
    } else {
      console.log('user не получен');
      navigate('auth');
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return <Outlet />;
};
