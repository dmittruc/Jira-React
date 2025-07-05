import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import store from '../store';
import { setAccessTokenAction } from '../store/actions/authActions';

const axiosInstance = axios.create({
  baseURL: 'https://nodejs-jira-pet-project.onrender.com/api',
  // baseURL: 'http://localhost:5000/api',
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const accessToken = store.getState().auth.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      store.dispatch(setAccessTokenAction({ accessToken: undefined }));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
