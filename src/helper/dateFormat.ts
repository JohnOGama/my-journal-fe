// format date to "Month Day, Year Hour:Minute"
export const dateFormatted = (date: string) => {
  const dateString = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const timeString = new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${dateString} @${timeString}`;
};
