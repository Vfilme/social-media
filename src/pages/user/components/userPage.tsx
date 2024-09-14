import React from 'react';
import { useAppSelector } from '../../../shared/hooks';

export const UserPage: React.FC = () => {
  const user = useAppSelector((state: any) => state.user.user);

  return (
    <div>
      <h1>user page</h1>
      <p>user: {JSON.stringify(user)}</p>
    </div>
  );
};
