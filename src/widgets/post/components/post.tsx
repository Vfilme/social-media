import React from 'react';
import { Post } from '../types/post';

interface Props {
  post: Post;
  userName?: string;
}

export const News: React.FC<Props> = ({ userName, post }) => {
  return (
    <div className="post">
      {userName && <h4>Пользователь: {userName}</h4>}
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <h5>{post.createdAt}</h5>
    </div>
  );
};
