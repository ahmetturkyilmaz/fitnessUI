import {WeeklyProgram} from "./WeeklyProgram";

export  interface TotalProgram {
    programName: string,
    programWeekType: string,
    weeklyPrograms: WeeklyProgram[]
}
