import {Sex} from "../enum/Sex";
import {Unit} from "../enum/Unit";

export interface UserNutritionInfo {
    id?: string,
    sex: Sex,

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
