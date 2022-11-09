import { Calendar, Week } from "../types/calendar";
import { CompletedTasks } from "../types/completedTask";

// Quartiles are used to color completed tasks calendar
const QUARTILES = [0.25, 50, 0.75];

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

  const completedTasksInDay = Object.values(byDateCompletedTasks).reduce(
    (filtered: Array<number>, completedTasks) => {
      if (completedTasks.length > 0) {
        filtered.push(completedTasks.length);
      }
      return filtered;
    },
    []
  );

  const completedTasksQuantileValues = getQuantileValues(
    completedTasksInDay,
    QUARTILES
  );
  // Reverse so that we find first the last quartile (prettier coloring)
  completedTasksQuantileValues.reverse();

  // Arrange all dates in arrays of weeks
  const arrangedWeeks: Array<Week> = [];
  dates.forEach((date) => {
    let week: Week = [];
    if (date.getDay() !== 6) {
      const maybeWeek = arrangedWeeks.pop();
      if (maybeWeek) {
        week = maybeWeek;
      }
    }
    const formattedDate = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}`;
    const completedTasks = byDateCompletedTasks[formattedDate] || [];
    const numberOfCompletedTasks = Object.keys(completedTasks).length;
    const quantile =
      numberOfCompletedTasks > 0
        ? completedTasksQuantileValues.length -
          completedTasksQuantileValues.findIndex((q) => {
            return numberOfCompletedTasks <= q;
          })
        : 0;
    week.push({
      date,
      completedTasks,
      quantile,
    });
    arrangedWeeks.push(week);
  });
  arrangedWeeks.forEach((week) => week.reverse());

  return arrangedWeeks;
}

// TODO we might want this format stored elsewhere so we don't recompute it each time
function toByDateCompletedTasks(completedTasks: CompletedTasks): {
  [date: string]: CompletedTasks;
} {
  const byDateCompletedTasks: { [date: string]: CompletedTasks } = {};
  completedTasks.forEach((completedTask) => {
    const tasks = byDateCompletedTasks[completedTask.date] || [];
    tasks.push(completedTask);
    byDateCompletedTasks[completedTask.date] = tasks;
  });
  return byDateCompletedTasks;
}

function getQuantileValues(
  array: Array<number>,
  qs: Array<number>
): Array<number> {
  const partitions: Array<number> = [];
  qs.forEach((q) => {
    partitions.push(getQuantileValue(array, q));
  });
  return partitions;
}

function getQuantileValue(array: Array<number>, q: number): number {
  const sorted = [...array].sort();
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  } else {
    return sorted[base];
  }
}
