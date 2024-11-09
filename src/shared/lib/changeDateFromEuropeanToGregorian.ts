export const changeDateFromEuropeanToGregorian = (date: string) => {
  return date.split('.').map(Number).reverse().join(',');
};
