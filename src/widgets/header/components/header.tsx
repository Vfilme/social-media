import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/news">news page</Link>
        </li>
        <li>
          <Link to="/user">user page</Link>
        </li>
        <li>
          <Link to="/messenger">messenger page</Link>
        </li>
      </ul>
    </div>
  );
};
