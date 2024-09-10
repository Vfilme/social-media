import axios from 'axios';
import React, { useState } from 'react';

export const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [data, setData] = useState();
  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        email,
        password,
      });
      localStorage.setItem('token', response.data?.token);
      setData(response.data?.token);
    } catch (error: any) {
      console.error(
        'Error registering user:',
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <div>
        <h1>зарегистрироваться</h1>
        <form onSubmit={sendData}>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">зарегистрироваться</button>
        </form>
        <div>
          <h3>{data}</h3>
        </div>
      </div>
    </>
  );
};
