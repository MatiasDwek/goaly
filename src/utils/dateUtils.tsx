export type CheckInDay = "today" | "yesterday";

// Returns the date in YYYY/MM/DD format
export function getFormattedDate(day: CheckInDay): string {
  const date = new Date();
  if (day === "yesterday") {
    date.setDate(date.getDate() - 1);
  }
  return `${date.getUTCFullYear()}/${date.getUTCMonth()}/${date.getUTCDate()}`;
}
