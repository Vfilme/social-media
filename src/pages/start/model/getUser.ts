import axios from 'axios';
import { URL } from '../../../shared/const/urls';

export const getUser = async () => {
  try {
    const { data } = await axios.get(`${URL.BAZE}/auth/token`, {
      withCredentials: true,
    });
    return data.user;
  } catch (error) {
    console.log(error);
  }
};
