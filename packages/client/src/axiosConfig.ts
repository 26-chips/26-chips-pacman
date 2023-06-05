import axios from 'axios';

export const axiosConfig = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
});
