export const getLocalTimezoneOffset = () => {
  const date = new Date();
  const offsetInMinutes = date.getTimezoneOffset();
  const offsetInHours = -offsetInMinutes / 60;
  return offsetInHours;
};
