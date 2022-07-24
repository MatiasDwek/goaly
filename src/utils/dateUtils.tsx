export type Day = "today" | "yesterday";

// Returns the date in YYYY/MM/DD format
export function getFormattedDate(day: Day): string {
  const date = new Date();
  if (day === "yesterday") {
    date.setDate(date.getDate() - 1);
  }
  return `${date.getUTCFullYear()}/${date.getUTCMonth()}/${date.getUTCDate()}`;
}
