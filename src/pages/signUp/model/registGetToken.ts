import axios from 'axios';
import { URL } from '../../../shared/const/urls';
import { UserRegist } from '../types/userRegist';

export const registGetToken = async (formData: UserRegist) => {
  try {
    const { data } = await axios.post(`${URL.BAZE}/auth/regist`, formData, {
      withCredentials: true,
    });
    return data;
  } catch (error: any) {
    console.error(
      'Error registering user:',
      error.response?.data || error.message
    );
  }
};
