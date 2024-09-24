import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../shared/hooks';

export const NewsPage: React.FC = () => {
  const [answer, setAnswer] = useState();
  const [news, setNews] = useState<null | any[]>(null);
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const user = useAppSelector((state: any) => state.user.user);

  const addPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      alert('необходимо авторизоваться');
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/add-post',
        {
          title,
          content,
          userId: user?.id,
        },
        { withCredentials: true }
      );
      setAnswer(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts', {
          withCredentials: true,
        });
        setNews(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);
  return (
    <div>
      <h1>news page {JSON.stringify(typeof user?.id)}</h1>
      {answer}
      <form onSubmit={addPost}>
        <p>заголовок:</p>
        <br />
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br />
        <p>содержание</p>
        <input
          type="text"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <br />
        <button type="submit">создать пост</button>
      </form>
      {news &&
        news.map((post) => {
          return (
            <>
              <div>
                <h3>Пользователь: {post.User.email}</h3>
                <p>{post.title}</p>
                <p>{post.content}</p>
              </div>
            </>
          );
        })}
    </div>
  );
};
