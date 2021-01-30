import Axios from 'axios';
import {getAccessToken, removeAccessToken} from "./AuthHelper";

const get = async (endpoint, params) => {
  const token = await getAccessToken();
  const headers = {
    Authorization: 'Bearer ' + token
  }
  return Axios
    .get(
      `${endpoint}`,
      {
        params,
        headers: headers
      },
    )
    .then((response) => {
      return response.data;
    })
    .catch(
      (e) => {
        console.log('error ', e);
      }
    )
}

const post = async (endpoint, body) => {
  const token = await getAccessToken();
  const headers = {
    Authorization: 'Bearer ' + token
  }
  return Axios
    .post(
      `${endpoint}`,
      body,
      {
        headers: headers
      },
    )
    .then((response) => {
      return response.data;
    })
}
const put = async (endpoint, body) => {
  const token = await getAccessToken();
  const headers = {
    Authorization: 'Bearer ' + token
  }
  return Axios
    .put(
      `${endpoint}`,
      body,
      {
        headers: headers
      },
    )
    .then((response) => {
      return response.data;
    })
}

export {get, post, put};

