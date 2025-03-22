export const sanitizePhoneNumber = (number: string) =>
  number
    .replace(/-|[^0-9]/g, "")
    .trim()
    .substring(0, 10);

export const formatPhoneNumber = (number: string) => {
  if (number.length > 6) {
    return `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6, 10)}`;
  } else if (number.length > 3) {
    return `${number.slice(0, 3)}-${number.slice(3, 6)}`;
  } else {
    return number;
  }
};


 export const cleanedInput = (text: string, limit: number) =>
   text.replace(/\s/g, "").trim().substring(0, limit);