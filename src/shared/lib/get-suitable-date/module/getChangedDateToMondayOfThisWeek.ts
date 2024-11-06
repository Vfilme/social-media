export const getChangedDateToMondayOfThisWeek = (date: Date) => {
  const weekDay = date.getDay();
  const daysDifference = (weekDay === 0 ? -6 : 1) - weekDay;
  date.setDate(date.getDate() + daysDifference);
  date.setHours(0, 0, 0, 0);
  return date; //смещаем дату на понедельник в той недели, в которой находится число месяца
};
