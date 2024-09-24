import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './usersPage.scss';
import { useAppSelector } from '../../../shared/hooks';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  updateAt: string;
}

type Props = {
  userName: string | null;
};

export const UsersPage: React.FC<Props> = ({ userName }) => {
  const [users, setUsers] = useState<User[] | null | any>(null);
  const user: any = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const writeMessage = async (id: number) => {
    try {
      const response: any = await axios.post(
        'http://localhost:5000/write-message',
        {
          userId: user.id,
          secondUserId: id,
        }
      );
      const { chatId, message } = response.data;
      console.log(message);
      navigate(`/messenger/${chatId}`);
    } catch (error) {
      console.log(error, 'error with write message (client)');
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        const users = response.data;
        if (users) {
          setUsers(
            users.filter((e: User) => {
              return e.id != user.id;
            })
          );
          console.log('this is user', user);
        } else {
          console.log('users or user не получены');
        }
      } catch (error) {
        console.log(error, 'problem with get users (client)');
      }
    };
    if (user) getUsers();
  }, [user]);

  return (
    <div className="chats">
      {users && (
        <ul>
          {users.map((user: any) => {
            return (
              <li
                className={`${userName == user.email && 'actual'}`}
                onClick={() => {
                  writeMessage(user.id);
                }}
              >
                <span>{user.email}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
