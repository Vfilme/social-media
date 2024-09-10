import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { NewsPage } from '../../pages/news';
import { UserPage } from '../../pages/user';
import { MessengerPage } from '../../pages/messenger';
import { Layout } from '../layout/components/layout';
import { AuthPage } from '../../pages/authorization';
import { StartPage } from '../../pages/start/components/startPage';
import { SignInPage } from '../../pages/signIn';
import { SignUpPage } from '../../pages/signUp/components/SignUpPage';

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
            path: 'messenger',
            element: <MessengerPage />,
          },
        ],
      },
      {
        path: 'auth',
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
  // {
  //   path: 'sign-in',
  //   element: <SignInPage />,
  // },
  // {
  //   path: 'sign-up',
  //   element: <SignUpPage />,
  // },
  // {
  //   path: '/',
  //   element: <Layout />,
  //   children: [
  //     {
  //       path: 'news',
  //       element: <NewsPage />,
  //     },
  //     {
  //       path: 'user',
  //       element: <UserPage />,
  //     },
  //     {
  //       path: 'messenger',
  //       element: <MessengerPage />,
  //     },
  //   ],
  // },
]);
