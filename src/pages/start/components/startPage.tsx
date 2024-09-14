import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { setUser } from '../../../features/post/makePost';

export const StartPage: React.FC = () => {
  const navigate = useNavigate();
  const [statusToken, setStatusToken] = useState();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.user.user);

  useEffect(() => {
    console.log('done');
  });
  const checkToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token', {
        withCredentials: true,
      });
      setStatusToken(response.data.message);
      dispatch(setUser(response.data.user));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Outlet />
      <button
        onClick={() => {
          checkToken();
        }}
      >
        проверить токен
      </button>
      <div>{statusToken}</div>
    </>
  );
};
