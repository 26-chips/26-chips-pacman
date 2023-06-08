import axios from 'axios';

const headers = {
  accept: 'application/json',
  'content-type': 'application/json',
};

export const axiosConfig = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
  headers,
  withCredentials: true,
});
