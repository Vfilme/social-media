import { NavigateFunction } from 'react-router-dom';
import { URL } from '../../../shared/const/urls';
import axios from 'axios';

export const startChat = async (
  userId: number,
  partnerId: number,
  navigate: NavigateFunction
) => {
  try {
    const response: any = await axios.post(
      `${URL.BAZE}/chat/write-message`,
      {
        userId,
        secondUserId: partnerId,
      },
      {
        withCredentials: true,
      }
    );
    const { chatId, message } = response.data;
    console.log(message);
    navigate(`/messenger/${chatId}`);
  } catch (error) {
    console.log(error, 'error with write message (client)');
  }
};
