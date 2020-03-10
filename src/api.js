import axios from 'axios';
import {Api} from './const';

export const createAPI = () => {
  const api = axios.create({
    baseURL: Api.BASE_URL,
    timeout: Api.TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
