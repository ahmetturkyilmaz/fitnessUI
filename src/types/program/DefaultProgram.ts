import {DailyProgram} from "./DailyProgram";
import {WeeklyProgram} from "./WeeklyProgram";
import {TotalProgram} from "./TotalProgram";

const dailyPrograms: DailyProgram[] = [{
  name: "day 1",
  dayOfWeek: "MONDAY",
}, {
  name: "day 2",
  dayOfWeek: "TUESDAY",
}, {
  name: "day 3",
  dayOfWeek: "WEDNESDAY",
}, {
  name: "day 4",
  dayOfWeek: "THURSDAY",
}, {
  name: "day 5",
  dayOfWeek: "FRIDAY",
}, {
  name: "day 6",
  dayOfWeek: "SATURDAY",
}, {
  name: "day 7",
  dayOfWeek: "SUNDAY",
}]
const weeklyPrograms: WeeklyProgram[] =
  [
    {
      name: "WEEK_ONE",
      dailyPrograms: dailyPrograms
    },
  ]

const initializingTotalProgramData: TotalProgram = {
  programName: "New Program",
  programWeekType: 'ONE_WEEK',
  weeklyPrograms: weeklyPrograms
}

export {initializingTotalProgramData};