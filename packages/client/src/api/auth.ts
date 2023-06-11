import { axiosConfig } from 'axiosConfig';

export const auth = async <T>(data: T) => {
  try {
    return await axiosConfig.post('auth/signin', data);
  } catch (e) {
    console.error(e);
  }
};
