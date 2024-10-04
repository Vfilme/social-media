import axios from 'axios';
import React, { useState } from 'react';
import { URL } from '../../../shared/const/urls';
import { useAppDispatch } from '../../../shared/store/hooks/useAppDispatch';
import { useAppSelector } from '../../../shared/store/hooks/useAppSelector';
import { setUser } from '../../../shared/store/slices/userSlice';

export const SignInPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.user.user);

  const checkData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${URL.BAZE}/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      const { user } = response.data;
      if (user) {
        dispatch(setUser(user));
      }
    } catch (error) {
      console.error('error with sign in process (client):', error);
    }
  };

  return (
    <>
      <div>
        <h2>войти</h2>
        <form onSubmit={checkData}>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">войти</button>
        </form>
        <div>
          <h3>{JSON.stringify(user)}</h3>
        </div>
      </div>
    </>
  );
};
