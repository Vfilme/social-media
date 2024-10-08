import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.scss';

export const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/news">новости</Link>
        </li>
        <li>
          <Link to="/user">аккаунт</Link>
        </li>
        <li>
          <Link to="/messenger">сообщения</Link>
        </li>
        <li>
          <Link to={'/friends'}>друзья</Link>
        </li>
      </ul>
    </div>
  );
};
