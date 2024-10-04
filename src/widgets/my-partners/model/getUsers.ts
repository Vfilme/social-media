import axios from 'axios';
import { URL } from '../../../shared/const/urls';
import { User } from '../../../shared/types/user';

export const getUsers = async (user: User) => {
  try {
    const response = await axios.get(`${URL.BAZE}/user/users`);
    const users = response.data;
    if (users) {
      return users.filter((e: User) => {
        return e.id != user.id;
      });
    } else {
      console.log('users or user не получены');
    }
  } catch (error) {
    console.log(error, 'problem with get users (client)');
  }
};
