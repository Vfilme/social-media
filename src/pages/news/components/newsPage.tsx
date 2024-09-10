import axios from 'axios';
import React from 'react';

export const NewsPage: React.FC = () => {
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        email: 'email',
        password: 'password',
      });
      console.log(response.data); // Выводим ответ сервера в консоль
    } catch (error) {
      console.error(error); // Выводим ошибку в консоль
    }
  };
  return (
    <div>
      <h1>news page</h1>
      <button onClick={handleSubmit}>click</button>
    </div>
  );
};
