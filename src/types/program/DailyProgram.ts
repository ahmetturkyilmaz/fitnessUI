import {MoveSet} from './MoveSet';

export interface DailyProgram {
  name: string;
  dayOfWeek: string;
  moveSet?: MoveSet[];
}
