export const getDayMonthYearWithMyTimeZone = (date: string) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const objDate: any = new Date(date);
  const formattedDate = objDate.toLocaleDateString({
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    timeZone,
  });
  return formattedDate;
};
