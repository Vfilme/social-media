import React from 'react';
import { useNavigate } from 'react-router-dom';
import './authPage.scss';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <h2>welcom to my social network!</h2>
      <button onClick={() => navigate('sign-in')}>войти</button>
      <button onClick={() => navigate('sign-up')}>зарегистрироваться</button>
    </div>
  );
};
