import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routers';
import { Provider } from 'react-redux';
import './styles/global.scss';
import { store } from '../shared/store';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};
