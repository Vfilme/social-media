import React from 'react';
import { Outlet } from 'react-router-dom';
import './layout.scss';
import { Sidebar } from '../../widgets/header';

export const Layout: React.FC = () => {
  return (
    <div className="page-layout">
      <Sidebar />
      <Outlet />
    </div>
  );
};
