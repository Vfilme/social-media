import axios from 'axios';
import React, { useState } from 'react';

export const SignInPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [data, setData] = useState();

  const checkData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
      const { message } = response.data;
      setData(message);
    } catch (error) {
      console.error('some error with sign in:', error);
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
          <h3>{data}</h3>
        </div>
      </div>
    </>
  );
};
