import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { NewsPage } from '../../pages/news';
import { UserPage } from '../../pages/user';
import { MessengerPage } from '../../pages/messenger';
import { AuthPage } from '../../pages/authorization';
import { StartPage } from '../../pages/start/components/startPage';
import { SignInPage } from '../../pages/signIn';
import { Layout } from '../layout';
import { FriendsPage } from '../../pages/friends';
import { SignUpPage } from '../../pages/signUp';
import { AuthLayout } from '../auth-layout';

export const router = createBrowserRouter([
  {
    path: '',
    element: <StartPage />,
    children: [
      {
        path: '',
        element: <Layout />,
        children: [
          {
            path: 'news',
            element: <NewsPage />,
          },
          {
            path: 'user',
            element: <UserPage />,
          },
          {
            path: 'messenger/:id?',
            element: <MessengerPage />,
          },
          {
            path: 'friends',
            element: <FriendsPage />,
          },
        ],
      },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: '',
            element: <AuthPage />,
          },
          {
            path: 'sign-in',
            element: <SignInPage />,
          },
          {
            path: 'sign-up',
            element: <SignUpPage />,
          },
        ],
      },
    ],
  },
]);
