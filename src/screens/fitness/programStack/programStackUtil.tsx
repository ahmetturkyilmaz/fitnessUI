import {TotalProgram} from '../../../types/program/TotalProgram';
import {WeeklyProgram} from '../../../types/program/WeeklyProgram';
import {DayOfWeek} from '../../../types/enum/DayOfWeek';
import {MoveSet} from '../../../types/program/MoveSet';

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
const updateMoveSetByDay = (totalProgram: TotalProgram | undefined, dayOfWeek: DayOfWeek, newMoveSet: MoveSet[] | undefined,) => {
    if (totalProgram) {
        const newTotalProgram: TotalProgram = {...totalProgram};

        const programOfDayIndex = newTotalProgram?.weeklyPrograms?.[0]?.dailyPrograms?.findIndex(i => i.dayOfWeek === dayOfWeek) ?? -1;
        if (programOfDayIndex >= 0) {
            newTotalProgram.weeklyPrograms[0].dailyPrograms[programOfDayIndex].moveSet = newMoveSet;
        }
        /*
        let oneWeekProgram;
        if (newTotalProgram.weeklyPrograms) {
          oneWeekProgram = newTotalProgram.weeklyPrograms[0];
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
        */

        return newTotalProgram;
    }
};

export {getMoveSetByDay, updateMoveSetByDay};
