export const getYearMonth = (date: string | Date) => {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  return `${year}-${month}`;
};
