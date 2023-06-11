export const CurrentDate = () => {
  const today = new Date();
  const todayFormatted = today.toISOString().split("T")[0];

  return todayFormatted;
};

export const TwoYearsAgoDate = () => {
  const today = new Date();

  const twoYearsAgo = new Date(today);
  twoYearsAgo.setFullYear(today.getFullYear() - 2);
  const twoYearsAgoFormatted = twoYearsAgo.toISOString().split("T")[0];

  return twoYearsAgoFormatted;
};

export const convertUnixTimestamp = (unixTimestamp: any) => {
  const timestamp = new Date(unixTimestamp);
  return timestamp.toLocaleString();
};
