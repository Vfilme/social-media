import { getDayWithMonthFromDate } from '../getDayWithMonthFromDate';
import { isCurrentWeek } from './module/isCurrentWeek';

export const getSuitableDate = (date: string) => {
  const now: Date = new Date();
  const objDate = new Date(date);

  objDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const daysGap = ((now as any) - (objDate as any)) / (1000 * 60 * 60 * 24);

  if (daysGap == 0) return 'today';
  if (daysGap == 1) return 'yeasterday';
  if (isCurrentWeek(new Date(objDate))) {
    return objDate.toLocaleDateString('ru-RU', { weekday: 'long' });
  }
  if (objDate.getFullYear() == objDate.getFullYear()) {
    return getDayWithMonthFromDate(objDate);
  } else {
    return date;
  }
};
