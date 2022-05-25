import { derived, writable } from 'svelte/store';
import Cookies from 'js-cookie';
import type { AxiosResponse, AxiosError } from 'axios';
import api from '../services/api';

const user = writable(null as User);
const getMeStatus = writable('idle' as FetchStatus);
const authenticateStatus = writable('idle' as FetchStatus);

const isAuthenticated = derived(
  user,
  ($user) => !!Cookies.get('sveltetsboilerplate.token')?.length && !!$user?.id,
  false,
);

const authenticate = async (payload: {
  email: string;
  password: string;
}): Promise<StoreActionResponse> => {
  try {
    authenticateStatus.update(() => 'fetching');

    const { email, password } = payload;

    const response = await api.post('/auth/login', { email, password });

    const { status, data } = response as Omit<AxiosResponse, 'data'> & {
      data: {
        access_token: string;
        user: User;
      };
    };

    if (status !== 200 || !data?.access_token || !data?.user) {
      authenticateStatus.update(() => 'error');

      return {
        status: response?.status || 400,
      };
    }

    Cookies.set('sveltetsboilerplate.token', data.access_token, { expires: 7 });

    api.defaults.headers.common['Authorization'] = data.access_token;

    user.update((prevState) => ({ ...prevState, ...data.user }));
    authenticateStatus.update(() => 'success');

    return { status };
  } catch (error) {
    console.warn(error);

    authenticateStatus.update(() => 'error');

    return {
      status: 400,
    };
  }
};

const getMe = async (): Promise<StoreActionResponse> => {
  try {
    getMeStatus.update(() => 'fetching');

    const response = await api.get('/auth/me');

    const { status, data } = response as Omit<AxiosResponse, 'data'> & {
      data: User;
    };

    if (status !== 200 || !data) {
      getMeStatus.update(() => 'error');

      return {
        status: response?.status || 400,
      };
    }

    user.update((prevState) => ({ ...prevState, ...data }));
    getMeStatus.update(() => 'success');

    return { status };
  } catch (error) {
    console.warn(error);

    getMeStatus.update(() => 'error');

    return {
      status: 400,
    };
  }
};

const unauthenticate = () => {
  api.defaults.headers.common['Authorization'] = '';
  Cookies.remove('sveltetsboilerplate.token');
  user.update(() => null);
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response.status === 401) unauthenticate();
    return error;
  },
);

if (Cookies.get('sveltetsboilerplate.token')?.length) void getMe();

export default {
  user,
  authenticateStatus,
  getMeStatus,
  isAuthenticated,
  authenticate,
  getMe,
  unauthenticate,
};
