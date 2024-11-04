export const getDayWithMonthFromDate = (date: any) => {
  date = new Date(date);
  const formattedDate = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
  return formattedDate;
};
