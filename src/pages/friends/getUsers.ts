import axios from 'axios';
import { URL } from '../../shared/const/urls';

export const getUsers = async () => {
  try {
    const { data } = await axios.get(`${URL.BAZE}/user/users`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
