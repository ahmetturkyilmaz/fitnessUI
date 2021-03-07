import {createAction, createReducer} from '@reduxjs/toolkit';
import {JWTResponse} from "../../types/auth/JWTResponse";

export const setToken = createAction<string | null>('user/set-token');
export const setUser = createAction<JWTResponse>('user/set-user')

export interface IUserState {
    token?: string | null;
    jwtResponse?: JWTResponse
}

const initialState: IUserState = {
    token: null,
    jwtResponse: undefined
};
export const userReducer = createReducer(initialState, (builder) => {
    builder.addCase(setToken, (state, action) => {
        state.token = action.payload;
    }).addCase(setUser, (state, action) => {
        state.jwtResponse = action.payload;
    });
});
