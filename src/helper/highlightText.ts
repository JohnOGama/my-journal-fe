export const highlightText = (text: string, query?: string) => {
  if (!query) {
    return text;
  }
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<span class='bg-yellow-200'>$1</span>");
};
