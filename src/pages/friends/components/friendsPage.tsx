import React, { useEffect, useState } from 'react';
import { User } from '../../../shared/types/user';
import { getUsers } from '../getUsers';
import './friendsPage.scss';
import { useAppSelector } from '../../../shared/store/hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';
import { getChatId } from '../model/startChat';

export const FriendsPage: React.FC = () => {
  const [users, setUsers] = useState<null | User[]>(null);
  const user: any = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!users) {
      (async () => {
        const users = await getUsers();
        setUsers(users);
        console.log(users);
      })();
    }
  }, [users]);
  const openChat = async (partnerLogin: string) => {
    const chatId: any = await getChatId(user.login, partnerLogin);
    navigate(`/messenger/${chatId}`);
  };

  return (
    <div className="friends-page">
      <div className="users">
        {users &&
          users.map((user: any) => {
            return (
              <div
                className="user"
                onClick={() => {
                  navigate(`/${user.login}`);
                }}
              >
                <p>
                  {user.login}
                  <div
                    className="user-menu"
                    onClick={() => openChat(user.login)}
                  >
                    написать пользователю
                  </div>
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};
