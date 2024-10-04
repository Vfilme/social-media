import axios from 'axios';
import { URL } from '../../../shared/const/urls';

export const getPosts = async () => {
  try {
    const response = await axios.get(`${URL.BAZE}/post/posts`, {
      withCredentials: true,
    });
    return response.data.posts;
  } catch (error) {
    console.log(error);
  }
};
