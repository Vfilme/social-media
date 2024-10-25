import axios from 'axios';
import { URL } from '../../../shared/const/urls';

export const getChats = async () => {
  try {
    const response = await axios.get(`${URL.BAZE}/chat/chats`, {
      withCredentials: true,
    });
    const chatsWithPartner = response.data.chatsWithPartners;
    if (chatsWithPartner) {
      return chatsWithPartner;
    } else {
      console.log('users or user не получены');
    }
  } catch (error) {
    console.log(error, 'problem with get users (client)');
  }
};
