import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import authStore from '../stores/authStore';

const api = axios.create({
  baseURL: 'https://api.url.com/api/v1',
  validateStatus: (status) => status !== 401,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response.status === 401) authStore.actions.unauthenticate();
    return error;
  },
);

const token = Cookies.get('sveltetsboilerplate.token');

if (token?.length) api.defaults.headers.common['Authorization'] = token;

export default api;
