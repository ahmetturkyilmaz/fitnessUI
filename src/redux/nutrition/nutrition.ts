import {createAction, createReducer} from "@reduxjs/toolkit";
import {UserNutritionInfo} from "../../types/nutrition/UserNutritionInfo";

export const setUserNutritionInfoList = createAction<UserNutritionInfo[]>(
  'program/set-usernutrition-info-list',
);

export interface IUserNutritionInfoState {
    userNutritionInfoList: UserNutritionInfo[];

}

const initialState: IUserNutritionInfoState = {
    userNutritionInfoList: [],
};

export const nutritionReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(setUserNutritionInfoList, (state, action) => {
          state.userNutritionInfoList = action.payload;
      })
});