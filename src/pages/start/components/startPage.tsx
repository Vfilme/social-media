import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { getUser } from '../../../features/post/makePost';

export const StartPage: React.FC = () => {
  const navigate = useNavigate();
  const [statusToken, setStatusToken] = useState();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.user.user);

  useEffect(() => {
    console.log('done');
  });
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImVtYWlsIjoibG9oIiwiaWF0IjoxNzI1OTM3NDczLCJleHAiOjE3MjYwMjM4NzN9.kXIIpTNkNUztPrAeyc2f_t1jBdhzHQeiCQswlb0MfU8';

  const checkToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStatusToken(response.data.message);
      dispatch(getUser(response.data.user));
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
      <div>{JSON.stringify(user)}</div>
    </>
  );
};
