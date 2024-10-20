import axios from 'axios';
import { URL } from '../../../shared/const/urls';

export const getChatId = async (userLogin: string, partnerLogin: string) => {
  try {
    const { data } = await axios.post(
      `${URL.BAZE}/chat/start-chat`,
      {
        userLogin,
        partnerLogin,
      },
      {
        withCredentials: true,
      }
    );
    return data.chatId;
  } catch (error) {
    console.log(error);
  }
};
