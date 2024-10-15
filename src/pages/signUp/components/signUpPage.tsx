import React, { useState } from 'react';
import './signUpPage.scss';
import { registGetToken } from '../model/registGetToken';
import { UserRegist } from '../types/userRegist';
import { setUser } from '../../../shared/store/slices/userSlice';
import { useAppDispatch } from '../../../shared/store/hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';

export const SignUpPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserRegist>({
    name: '',
    surname: '',
    age: 0,
    login: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    (async () => {
      const { message, user } = await registGetToken(formData);
      if (user) {
        console.log(user);
        dispatch(setUser(user));
        navigate('/news');
      }

      console.log(message);
    })();

    setFormData({
      name: '',
      surname: '',
      age: 0,
      login: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="sign-up-page">
      <h2>Регистрация:</h2>
      <form onSubmit={sendData} className="sign-up">
        <input
          type="text"
          name="name"
          placeholder="Введите ваше имя"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="surname"
          placeholder="Введите вашу фамилию"
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Введите ваш возраст"
          min={0}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="login"
          placeholder="Введите ваш логин"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="email"
          placeholder="Введите ваш электронную почту"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="password"
          placeholder="Введите ваш пароль"
          onChange={handleInputChange}
          required
        />
        <button type="submit">зарегистрироваться</button>
      </form>
    </div>
  );
};
