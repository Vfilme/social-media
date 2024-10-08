import React from 'react';
import './authLayout.scss';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
};
