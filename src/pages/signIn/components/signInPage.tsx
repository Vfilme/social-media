import axios from 'axios';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { setUser } from '../../../features/post/makePost';

export const SignInPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [data] = useState();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.user.user);

  const checkData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/login',
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
