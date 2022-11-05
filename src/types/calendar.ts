import { CompletedTasks } from "../reducers/completedTasksReducer";

export interface Day {
  date: Date;
  completedTasks: CompletedTasks;
  // Values of the quartiles of completed tasks
  // For example, if user completed 3 tasks one day, 2 another two days, and 1 another two days, we'll have:
  // completed tasks: [1, 1, 2, 2, 3] (not necessarily ordered)
  // quartile values: [1, 2, 2]
  // Days without completed tasks are ignored. We use this variable to colour the calendar.
  quantile: number;
}

export type Week = Array<Day>; // weeks have >=1 and <=7 days
export type Calendar = Array<Week>;
