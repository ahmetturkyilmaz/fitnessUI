import {RepWeight} from "./RepWeight";
import {MoveType} from "./enum/MoveType";

export interface MoveSet {
  name: string,
  moveNumber: number,
  moveType: MoveType,
  sets?: number,
  setRepWeightMap?: Record<number, RepWeight>
  time?: number
}