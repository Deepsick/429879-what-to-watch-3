import axios from 'axios';
import {Api, Status} from './const';

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: Api.BASE_URL,
    timeout: Api.TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (response.status === Status.UNAUTHORIZED) {
      onUnauthorized();

      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
