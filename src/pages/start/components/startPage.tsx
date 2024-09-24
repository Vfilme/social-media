import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../../shared/hooks';
import { setUser } from '../../../features/post/makePost';

export const StartPage: React.FC = () => {
  const [statusToken, setStatusToken] = useState();
  const dispatch = useAppDispatch();

  const checkToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token', {
        withCredentials: true,
      });
      const user = response.data.user;
      if (user) {
        console.log('user: ', user);
        dispatch(setUser(user));
      } else {
        console.log('user не получен');
      }
      setStatusToken(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkToken();
  });

  return (
    <>
      <Outlet />
      <div>{statusToken}</div>
    </>
  );
};
