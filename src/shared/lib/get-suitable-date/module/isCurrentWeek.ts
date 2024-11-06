import { getChangedDateToMondayOfThisWeek } from './getChangedDateToMondayOfThisWeek';

export const isCurrentWeek = (date: Date) => {
  const mondayCurrentWeek = getChangedDateToMondayOfThisWeek(new Date());
  const dateOnMonday = getChangedDateToMondayOfThisWeek(date);
  return mondayCurrentWeek.getTime() === dateOnMonday.getTime();
};
