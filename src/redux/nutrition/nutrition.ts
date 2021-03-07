import {createAction, createReducer} from "@reduxjs/toolkit";
import {UserNutritionInfo} from "../../types/nutrition/UserNutritionInfo";

export const setUserNutritionInfoList = createAction<UserNutritionInfo[]>(
    'nutrition/set-user-nutrition-info-list',
);
export const setLatestUserNutritionInfo = createAction<UserNutritionInfo>(
    'nutrition/set-latest-user-nutrition-info'
)

export interface IUserNutritionInfoState {
    userNutritionInfoList: UserNutritionInfo[];
    latestNutritionInfo?: UserNutritionInfo;
}

const initialState: IUserNutritionInfoState = {
    userNutritionInfoList: [],
    latestNutritionInfo: undefined,
};

export const nutritionReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setUserNutritionInfoList, (state, action) => {
            state.userNutritionInfoList = action.payload;
        })
        .addCase(setLatestUserNutritionInfo, (state, action) => {
            state.latestNutritionInfo = action.payload
        })
});
