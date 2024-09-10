import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../../widgets/header/components/header';

export const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
