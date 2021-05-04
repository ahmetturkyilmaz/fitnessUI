import {Gender} from "../enum/Gender";
import {Unit} from "../enum/Unit";

export interface JWTResponse {
  accessToken: string,
  type: string,
  id: string,
  email: string,
  name: string,
  surname: string,
  gender: Gender,
  unit: Unit
  roles: string[]
}