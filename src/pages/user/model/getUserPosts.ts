import axios from 'axios';
import { URL } from '../../../shared/const/urls';

export const getUserPosts = async (login: string) => {
  try {
    const { data } = await axios.get(`${URL.BAZE}/post/user-posts`, {
      withCredentials: true,
      params: { login },
    });
    return data.userPosts;
  } catch (error) {
    console.log(error);
  }
};
