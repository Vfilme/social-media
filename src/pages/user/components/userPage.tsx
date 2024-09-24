import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../shared/hooks';
import axios from 'axios';

export const UserPage: React.FC = () => {
  const user = useAppSelector((state: any) => state.user.user);
  const [userPosts, setUserPosts] = useState<any>();

  const removePost = async (id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/remove-post/${id}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/user-posts', {
          withCredentials: true,
        });
        setUserPosts(data.userPosts);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);

  return (
    <div>
      <h1>user page</h1>
      <p>user: {JSON.stringify(user)}</p>
      <p>
        posts:{' '}
        {userPosts &&
          userPosts.map((e: any) => {
            return (
              <div>
                <p>{e.title}</p>
                <p>{e.content}</p>
                <button
                  onClick={() => {
                    removePost(e.id);
                  }}
                >
                  удалить пост
                </button>
              </div>
            );
          })}
      </p>
    </div>
  );
};
