import {createAction, createReducer} from '@reduxjs/toolkit';

export const setLoading = createAction<boolean>('core/set-loading');

export interface ICoreState {
  loading?: boolean;
}

const initialState: ICoreState = {
  loading: false,
};
export const coreReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLoading, (state, action) => {
    state.loading = action.payload;
  });
});
