import {createAction, createReducer} from '@reduxjs/toolkit';

export const setToken = createAction<string>('user/set-token');

export interface IUserState {
  token?: string | null;
}

const initialState: IUserState = {
  token: null,
};
export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setToken, (state, action) => {
    state.token = action.payload;
  });
});
