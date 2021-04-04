import {Sex} from "../enum/Sex";

export interface UserNutritionInfo {
  id?: string;
  sex: Sex;
  height: number;
  weight: number;
  fatPercentage: number;
  musclePercentage: number;
  createdAt?: number;
  createdBy?: number;
  waist: number;
  hip: number;
  neck: number;
  unit: string;
}
