import axios from 'axios';
import { URL } from '../../../shared/const/urls';

export const removePost = async (id: number) => {
  try {
    const response = await axios.delete(`${URL.BAZE}/post/remove-post/${id}`, {
      withCredentials: true,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
