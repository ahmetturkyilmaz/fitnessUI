import Axios from 'axios';

const baseUrl = 'https://85a6e4b9050f.ngrok.io/api/auth';

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
