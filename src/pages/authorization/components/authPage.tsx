import axios from 'axios';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  // get token
  const toketJWT: string | null = localStorage.getItem('token');
  // если есть отправить на проверку. нет перевести на другую страницу

  //   useEffect(() => {
  //     if (toketJWT === null) {
  //       navigate('/auth');
  //     }
  //   }, []);

  return (
    <>
      <Outlet />
      <h1>welcom to my social network!</h1>
      <button onClick={() => navigate('/sign-in')}>войти</button>
      <button
        onClick={() => {
          navigate('/sign-up');
        }}
      >
        зарегистрироваться
      </button>
    </>
  );
};
