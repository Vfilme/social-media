import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Provider } from 'react-redux';
import { store } from './stores/mainStore';
import './global.scss';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};
