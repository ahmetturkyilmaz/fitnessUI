import {TotalProgram} from '../types/program/TotalProgram';
import {createAction, createReducer} from '@reduxjs/toolkit';
import {WeeklyProgram} from '../types/program/WeeklyProgram';

export const setTotalProgramList = createAction<TotalProgram[]>(
  'program/set-total-program-list',
);
export const setTotalProgram = createAction<TotalProgram>(
  'program/set-total-program',
);
export const setWeeklyProgram = createAction<WeeklyProgram>(
  'program/set-weekly-program',
);

export interface IProgramState {
  totalProgramList: TotalProgram[];
  totalProgram?: TotalProgram;
  weeklyProgram?: WeeklyProgram;
}

const initialState: IProgramState = {
  totalProgramList: [],
  totalProgram: undefined,
  weeklyProgram: undefined,
};

export const programReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setTotalProgramList, (state, action) => {
      state.totalProgramList = action.payload;
    })
    .addCase(setTotalProgram, (state, action) => {
      state.totalProgram = action.payload;
    })
    .addCase(setWeeklyProgram, (state, action) => {
      state.weeklyProgram = action.payload;
    });
});
