import axios from 'axios';
import { URL } from '../../../shared/const/urls';

export const addPost = async (
  e: React.FormEvent<HTMLFormElement>,
  title: string,
  content: string
) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      `${URL.BAZE}/post/add-post`,
      {
        title,
        content,
      },
      { withCredentials: true }
    );
  } catch (error) {
    console.error(error);
  }
};
