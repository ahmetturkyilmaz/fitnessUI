import Axios from 'axios';

const baseUrl = '192.168.0.19:9090/api/auth';

export const getAuth = (email, password) => {
  return Axios.post(baseUrl + '/signin', {email: email, password: password});
};
export const postAuth = (email, name, surname, password) => {
  return Axios.post(baseUrl + '/signup', {
    email: email,
    name: name,
    surname: surname,
    password: password,
  });
};
