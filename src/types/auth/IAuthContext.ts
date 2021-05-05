import {JWTResponse} from './JWTResponse';
import {LoginRequest} from './LoginRequest';

export interface IAuthContext {
  getToken(): string;

  signIn(authContext: LoginRequest): Promise<JWTResponse>;

  signOut(): void;

  signUp(authContext: LoginRequest): Promise<string>;
}
