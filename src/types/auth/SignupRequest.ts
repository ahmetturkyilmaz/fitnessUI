import {Gender} from "../enum/Gender";
import {Unit} from "../enum/Unit";

export interface SignupRequest {
    name?: string;
    surname?: string;
    roles?: string[];
    email?: string;
    password?: string;
    gender?: Gender,
    unit?: Unit
}
