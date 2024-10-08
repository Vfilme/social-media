import axios from 'axios';
import { URL } from '../../../shared/const/urls';
import { LoginData } from '../types/loginData';

export const login = async (formData: LoginData) => {
  try {
    const { data } = await axios.post(
      `${URL.BAZE}/auth/login`,
      {
        email: formData.email,
        password: formData.password,
      },
      { withCredentials: true }
    );
    return data;
  } catch (error) {}
};
