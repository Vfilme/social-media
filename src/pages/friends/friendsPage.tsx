import React, { useEffect, useState } from 'react';
import { User } from '../../shared/types/user';
import { getUsers } from './getUsers';

export const FriendsPage: React.FC = () => {
  const [users, setUsers] = useState<null | User[]>(null);

  useEffect(() => {
    if (!users) {
      (async () => {
        const users = await getUsers();
        setUsers(users);
        console.log(users);
      })();
    }
  }, [users]);

  return (
    <div className="friends">
      {users &&
        users.map((user: any) => {
          return (
            <div>
              <p>{user.email}</p>
            </div>
          );
        })}
    </div>
  );
};
