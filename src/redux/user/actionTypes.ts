import {LoginRequest} from '../../types/auth/LoginRequest';

export const GET_AUTH = 'GET_AUTH';
export const CREATE_USER = 'CREATE_USER';

export interface GetAuthAction {
  type: typeof GET_AUTH;
  payload: LoginRequest;
}

export type UserActionTypes = GetAuthAction;
