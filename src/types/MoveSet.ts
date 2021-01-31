import {RepWeight} from './RepWeight';
import {MoveType} from './enum/MoveType';

export interface MoveSet {
  _id?: string;
  name?: string;
  moveNumber?: number;
  moveType?: MoveType;
  sets?: number;
  setRepWeightMap?: Record<number, RepWeight>;
  time?: number;
  createdAt?: number;
  createdBy?: string;
  version?: number;
}
