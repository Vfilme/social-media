import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.scss';
import { useAppSelector } from '../../../shared/store/hooks/useAppSelector';
import spiderText from '../../../shared/assets/images/spider-text.png';
import spiderPic from '../../../shared/assets/images/spider-picture.png';

export const Sidebar: React.FC = () => {
  const user: any = useAppSelector((state) => state.user.user);

  return (
    <>
      <div className="sidebar">
        <div className="main-logo">
          <img src={spiderPic} alt="spider" />
          <img src={spiderText} alt="spider" />
        </div>
        <ul>
          <li>
            <Link to="/news">новости</Link>
          </li>
          <li>
            <Link to={`/${user?.login}`}>моя страница</Link>
          </li>
          <li>
            <Link to="/messenger">сообщения</Link>
          </li>
          <li>
            <Link to={'/friends'}>друзья</Link>
          </li>
        </ul>
      </div>
    </>
  );
};
