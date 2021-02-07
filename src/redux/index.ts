import {combineReducers} from 'redux';
import {IUserState, userReducer} from './user';
import {configureStore} from '@reduxjs/toolkit';
import {coreReducer, ICoreState} from './core';
import {IProgramState, programReducer} from './program';

export interface IStore {
  core: ICoreState;
  user: IUserState;
  program: IProgramState;
}

const reducers = combineReducers({
  user: userReducer,
  core: coreReducer,
  program: programReducer,
});

export const store = configureStore({
  reducer: reducers,
});
