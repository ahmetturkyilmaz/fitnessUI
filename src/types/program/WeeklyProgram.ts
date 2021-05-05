import {DailyProgram} from "./DailyProgram";

export interface WeeklyProgram {
    name: string,
    dailyPrograms: DailyProgram[]
}