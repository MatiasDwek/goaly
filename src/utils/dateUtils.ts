import { CheckInDay } from "../types/completedTask";

// Returns the date in YYYY/MM/DD format
export function getFormattedDate(day: CheckInDay): string {
  const date = new Date();
  if (day === "yesterday") {
    date.setDate(date.getDate() - 1);
  }
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

const MONTH_SHORT_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function getHumanReadableDay(date: Date): string {
  const humanReadableDate = `${
    MONTH_SHORT_NAMES[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
  return humanReadableDate;
}
