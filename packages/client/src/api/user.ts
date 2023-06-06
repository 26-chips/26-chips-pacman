import { axiosConfig } from 'axiosConfig';

export const updateProfile = async <T>(data: T) =>
  axiosConfig.put('user/profile', data);

export const updateAvatar = async <T>(data: T) =>
  axiosConfig.put('user/profile/avatar', data, {
    withCredentials: true,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'multipart/form-data',
    },
  });

export const updatePassword = async <T>(data: T) =>
  axiosConfig.put('user/password', data);
