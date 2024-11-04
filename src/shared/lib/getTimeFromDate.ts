export const getTimeFromDate = (dateString: string): string => {
  const date = new Date(dateString);

  let wrongHours = date.getHours();
  let correctHours;
  if (wrongHours < 14) {
    correctHours = wrongHours + 10;
  } else {
    correctHours = 10 - (24 - wrongHours);
  }

  const hours = correctHours.toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};
