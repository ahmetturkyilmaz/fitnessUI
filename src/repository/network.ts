import Axios, {AxiosRequestConfig} from 'axios';
import {getAccessToken, removeAccessToken} from './AuthHelper';

const get = async (endpoint: string, params?: AxiosRequestConfig) => {
  const token = await getAccessToken();
  const headers = {
    Authorization: 'Bearer ' + token,
  };
  return Axios.get(`${endpoint}`, {
    params,
    headers: headers,
  })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log('error ', e);
    });
};

const post = async (endpoint: string, body?: any) => {
  const token = await getAccessToken();
  const headers = {
    Authorization: 'Bearer ' + token,
  };
  return Axios.post(`${endpoint}`, body, {
    headers: headers,
  }).then((response) => {
    return response.data;
  });
};
const put = async (endpoint: string, body?: any) => {
  const token = await getAccessToken();
  const headers = {
    Authorization: 'Bearer ' + token,
  };
  return Axios.put(`${endpoint}`, body, {
    headers: headers,
  }).then((response) => {
    return response.data;
  });
};

export {get, post, put};
