import {RepWeight} from './RepWeight';
import {MoveType} from '../enum/MoveType';

export interface MoveSet {
  _id?: string;
  name?: string;
  moveNumber: number;
  moveType?: MoveType;
  sets?: number;
  setRepWeightMap?: {[key: string]: RepWeight};
  time?: number;
  createdAt?: number;
  createdBy?: string;
  version?: number;
}
