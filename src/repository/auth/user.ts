import {LoginRequest} from '../../types/auth/LoginRequest';
import {post} from '../network';
import {JWTResponse} from '../../types/auth/JWTResponse';
import {SignupRequest} from '../../types/auth/SignupRequest';

const baseUrl = 'http://192.168.0.19:9090/api/auth';

export const getAuth = (authConcept: LoginRequest): Promise<JWTResponse> => {
  return post(baseUrl + '/signin', {
    email: authConcept.email,
    password: authConcept.password,
  }).then((response) => response.data);
};
export const postAuth = (authConcept: SignupRequest): Promise<string> => {
  return post(baseUrl + '/signup', {
    email: authConcept.email,
    name: authConcept.name,
    surname: authConcept.surname,
    password: authConcept.password,
    roles: authConcept.roles,
  }).then((response) => response.data);
};
