import {Unit} from "../enum/Unit";
import {Gender} from "../enum/Gender";

export interface UserNutritionInfo {
    id?: string,
    gender: Gender,
    createdAt?: Date,
    dateOfInfo: Date,
    createdBy?: string,
    height: number,
    weight: number,
    fatPercentage: number,
    musclePercentage: number,
    neck: number,
    shoulder: number,
    arm: number,
    forearm: number,
    chest: number,
    bust: number,
    waist: number,
    hip: number,
    thigh: number,
    calf: number,
    unit: Unit
}
