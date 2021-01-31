import * as React from 'react';
import {IAuthContext} from '../types/auth/IAuthContext';
import {JWTResponse} from '../types/auth/JWTResponse';

export const AuthContext = React.createContext<IAuthContext>({
  signIn(): JWTResponse | undefined {
    return undefined;
  },
  signOut(): void {},
  signUp(): string {
    return '';
  },
  getToken: () => {
    return '';
  },
} as IAuthContext);
