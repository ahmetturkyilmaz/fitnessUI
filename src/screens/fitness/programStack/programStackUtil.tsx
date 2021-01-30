import {TotalProgram} from "../../../model/TotalProgram";
import {WeeklyProgram} from "../../../model/WeeklyProgram";
import {DailyProgram} from "../../../model/DailyProgram";
import {DayOfWeek} from "../../../model/enum/DayOfWeek";
import {MoveSet} from "../../../model/MoveSet";

const getMoveSetByDay = (allWeeklyPrograms: WeeklyProgram[], dayOfWeek: DayOfWeek) => {
  if (allWeeklyPrograms && allWeeklyPrograms.length > 0) {
    let programOfDay;
    let oneWeekProgram = allWeeklyPrograms[0];
    let dailyPrograms = oneWeekProgram.dailyPrograms;

    for (let oneDayProgram of dailyPrograms) {
      if (oneDayProgram.dayOfWeek === dayOfWeek) {
        programOfDay = oneDayProgram;
      }
    }
    if (typeof programOfDay !== 'undefined' && typeof programOfDay.moveSet !== 'undefined') {
      return programOfDay.moveSet
    }
  }
  return [];
}
const updateMoveSetByDay = (totalProgram: TotalProgram, dayOfWeek: DayOfWeek, newMoveSet: MoveSet) => {
  let programOfDay;
  console.log("**", totalProgram.weeklyPrograms)
  let oneWeekProgram = totalProgram.weeklyPrograms[0];
  let dailyPrograms = oneWeekProgram.dailyPrograms;

  for (let oneDayProgram of dailyPrograms) {
    if (oneDayProgram.dayOfWeek === dayOfWeek) {
      programOfDay = oneDayProgram;
    }
  }
  programOfDay.moveSet = newMoveSet
  return totalProgram;
}


export {getMoveSetByDay, updateMoveSetByDay};