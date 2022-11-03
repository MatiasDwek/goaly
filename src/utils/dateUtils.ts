import { CompletedTasks } from "../reducers/completedTasksReducer";
import { Calendar, Week } from "../types/calendar";

export type CheckInDay = "today" | "yesterday";

// Returns the date in YYYY/MM/DD format
export function getFormattedDate(day: CheckInDay): string {
  const date = new Date();
  if (day === "yesterday") {
    date.setDate(date.getDate() - 1);
  }
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

export function createCalendar(
  start: Date,
  end: Date,
  completedTasks: CompletedTasks
): Calendar {
  const dates = [];
  const byDateCompletedTasks = toByDateCompletedTasks(completedTasks);
  let pointer = end;

  // Create array of all dates from start to end
  while (pointer.valueOf() - start.valueOf() > 0) {
    dates.push(pointer);
    const newDate = new Date(pointer);
    pointer = new Date(newDate.setDate(newDate.getDate() - 1)); // get day before
  }

  // Arrange all dates in arrays of weeks
  const arrangedDates: Calendar = [];
  dates.forEach((date) => {
    let week: Week = [];
    if (date.getDay() !== 6) {
      const maybeWeek = arrangedDates.pop();
      if (maybeWeek) {
        week = maybeWeek;
      }
    }
    const formattedDate = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}`;
    const completedTasks = byDateCompletedTasks[formattedDate];
    week.push({
      date,
      completedTasks,
    });
    arrangedDates.push(week);
  });
  return arrangedDates;
}

// TODO we might want this format stored elsewhere so we don't recompute it each time
function toByDateCompletedTasks(completedTasks: CompletedTasks): {
  [date: string]: CompletedTasks;
} {
  const byDateCompletedTasks: { [date: string]: CompletedTasks } = {};
  completedTasks.forEach((completedTask) => {
    const tasks = byDateCompletedTasks[completedTask.date] || [];
    tasks.push(completedTask);
  });
  return byDateCompletedTasks;
}
