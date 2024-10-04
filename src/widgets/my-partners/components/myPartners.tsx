import { User } from '../../../shared/types/user';
import { useNavigate } from 'react-router-dom';
import './myPartners.scss';
import { startChat } from '../model/startChat';
import { getUsers } from '../model/getUsers';
import { useEffect, useState } from 'react';
import React = require('react');
import { useAppSelector } from '../../../shared/store/hooks/useAppSelector';

type Props = {
  partnerName: string | null;
};

export const MyPartners: React.FC<Props> = ({ partnerName }) => {
  const [users, setUsers] = useState<User[] | null | any>(null);
  const user: any = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const users = await getUsers(user);
          setUsers(users);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [user]);

  return (
    <div className="my-partners">
      {users && (
        <ul>
          {users.map((partner: any) => {
            return (
              <li
                className={`${partnerName == partner.email && 'actual'}`}
                onClick={() => {
                  startChat(user.id, partner.id, navigate);
                }}
              >
                <span>{partner.email}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
