import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { URL } from '../../../shared/const/urls';
import { useAppDispatch } from '../../../shared/store/hooks/useAppDispatch';
import { setUser } from '../../../shared/store/slices/userSlice';
import './signInPage.scss';
import { login } from '../model/login';
import { LoginData } from '../types/loginData';
import { useNavigate } from 'react-router-dom';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const checkData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    (async () => {
      const { user, message } = await login(formData);
      if (user) {
        dispatch(setUser(user));
        navigate('/news');
      }
      console.log(message);
    })();
  };

  return (
    <div className="sign-in-page">
      <h2>Авторизация:</h2>
      <form onSubmit={checkData} className="sign-in">
        <input
          type="text"
          onChange={(e) =>
            setFormData((data) => ({ ...data, email: e.target.value }))
          }
          placeholder="Введите вашу электронную почту"
        />
        <input
          type="text"
          onChange={(e) =>
            setFormData((data) => ({ ...data, password: e.target.value }))
          }
          placeholder="Введите ваш пароль"
        />
        <button type="submit">войти</button>
      </form>
    </div>
  );
};
