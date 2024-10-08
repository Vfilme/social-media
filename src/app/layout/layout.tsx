import React from 'react';
import { Outlet } from 'react-router-dom';
import './layout.scss';
import { Sidebar } from '../../widgets/header';
import { useLocation } from 'react-router-dom';

export const Layout: React.FC = () => {
  const location = useLocation();
  const isMessengerPage = /^\/messenger(\/.*)?$/.test(location.pathname);

  return (
    <div className={`page-layout ${isMessengerPage ? 'messenger-layout' : ''}`}>
      <Sidebar />
      <Outlet />
    </div>
  );
};
