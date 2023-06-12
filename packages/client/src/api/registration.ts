import { axiosConfig } from 'axiosConfig';

interface IResponse {
  id: number;
}

export const registration = async <T>(
  data: T
): Promise<IResponse | undefined> => {
  try {
    const { data: response } = await axiosConfig.post('auth/signup', data);
    return response;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
