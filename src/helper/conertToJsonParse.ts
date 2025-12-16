export const convertToJsonParse = (data: string | undefined) => {
  if (!data) return "";

  const jsonString = data
    .replace(/```json/, "")
    .replace(/```/, "")
    .trim();

  return JSON.parse(jsonString);
};
