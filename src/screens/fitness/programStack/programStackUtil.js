const getMoveSetByDay = (allWeeklyPrograms, dayOfWeek) => {
  if (allWeeklyPrograms && allWeeklyPrograms.length > 0) {
    let programOfDay;
    let oneWeekProgram = allWeeklyPrograms[0];
    let dailyPrograms = oneWeekProgram.dailyProgram;

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
const initializingTotalProgramData = {
  programName: "New Program",
  programWeekType: 'ONE_WEEK',
  weeklyPrograms: [
    {
      name: "WEEK_ONE",
      dailyPrograms: [{
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
    },


  ]

}

export {getMoveSetByDay,initializingTotalProgramData};