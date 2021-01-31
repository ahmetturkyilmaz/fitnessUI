import {WeeklyProgram} from './WeeklyProgram';

export interface TotalProgram {
  _id?: string;
  programName?: string;
  programWeekType?: string;
  weeklyPrograms?: WeeklyProgram[];
  createdAt?: number;
  createdBy?: string;
  version?: number;
}
