import axios from 'axios';
import { URL } from '../../../shared/const/urls';

export const getUserPosts = async () => {
  try {
    const { data } = await axios.get(`${URL.BAZE}/post/user-posts`, {
      withCredentials: true,
    });
    return data.userPosts;
  } catch (error) {
    console.log(error);
  }
};
