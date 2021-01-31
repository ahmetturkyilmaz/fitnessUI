import {TotalProgram} from '../../../types/TotalProgram';
import {WeeklyProgram} from '../../../types/WeeklyProgram';
import {DailyProgram} from '../../../types/DailyProgram';
import {DayOfWeek} from '../../../types/enum/DayOfWeek';
import {MoveSet} from '../../../types/MoveSet';

const getMoveSetByDay = (
  allWeeklyPrograms: WeeklyProgram[],
  dayOfWeek: DayOfWeek,
) => {
  if (allWeeklyPrograms && allWeeklyPrograms.length > 0) {
    let programOfDay;
    let oneWeekProgram = allWeeklyPrograms[0];
    let dailyPrograms = oneWeekProgram.dailyPrograms;

    for (let oneDayProgram of dailyPrograms) {
      if (oneDayProgram.dayOfWeek === dayOfWeek) {
        programOfDay = oneDayProgram;
      }
    }
    if (
      typeof programOfDay !== 'undefined' &&
      typeof programOfDay.moveSet !== 'undefined'
    ) {
      return programOfDay.moveSet;
    }
  }
  return [];
};
const updateMoveSetByDay = (
  totalProgram: TotalProgram,
  dayOfWeek: DayOfWeek,
  newMoveSet: MoveSet,
) => {
  let programOfDay: undefined | DailyProgram;
  console.log('**', totalProgram.weeklyPrograms);
  let oneWeekProgram;
  if (totalProgram.weeklyPrograms) {
    oneWeekProgram = totalProgram.weeklyPrograms[0];
    let dailyPrograms = oneWeekProgram.dailyPrograms;
    for (let oneDayProgram of dailyPrograms) {
      if (oneDayProgram.dayOfWeek === dayOfWeek) {
        programOfDay = oneDayProgram;
      }
    }
  }
  if (programOfDay) {
    programOfDay.moveSet = newMoveSet;
  }
  return totalProgram;
};

export {getMoveSetByDay, updateMoveSetByDay};
