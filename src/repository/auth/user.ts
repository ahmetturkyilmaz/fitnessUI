import {LoginRequest} from '../../types/auth/LoginRequest';
import {postForAuth} from '../network';
import {JWTResponse} from '../../types/auth/JWTResponse';
import {SignupRequest} from '../../types/auth/SignupRequest';

const baseUrl = 'http://192.168.0.18:9090/api/auth';

export const getAuth = (authConcept: LoginRequest): Promise<JWTResponse> => {
    return postForAuth(baseUrl + '/signin', {
        email: authConcept.email,
        password: authConcept.password,
    }).then((response) => {
        console.log("network içi", response)
        return response
    });
};
export const postAuth = (authConcept: SignupRequest): Promise<string> => {
    return postForAuth(baseUrl + '/signup', {
        email: authConcept.email,
        name: authConcept.name,
        surname: authConcept.surname,
        password: authConcept.password,
        roles: authConcept.roles,
        gender: authConcept.gender,
        unit: authConcept.unit
    }).then((response) => response);
};

