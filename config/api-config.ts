import axios, { AxiosRequestHeaders } from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    config.headers = {
      Accept: 'application/json',
    } as AxiosRequestHeaders;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;
