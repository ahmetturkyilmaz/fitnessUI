import Axios from 'axios';
import {AuthConcept} from "../../model/auth/AuthConcept";
import {post} from "../network";

const baseUrl = 'http://192.168.0.19:9090/api/auth';

export const getAuth = (authConcept: AuthConcept) => {
  return post(baseUrl + '/signin',
    {
      email: authConcept.email,
      password: authConcept.password
    }
  );
};
export const postAuth = (authConcept: AuthConcept) => {
  return post(baseUrl + '/signup', {
    email: authConcept.email,
    name: authConcept.name,
    surname: authConcept.surname,
    password: authConcept.password,
  });
};
