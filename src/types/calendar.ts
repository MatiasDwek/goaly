import { CompletedTasks } from "../reducers/completedTasksReducer";

export interface CalendarDay {
  date: Date;
  completedTasks: CompletedTasks;
}

export type Week = Array<CalendarDay>; // weeks have >=1 and <=7 days
export type Calendar = Array<Week>;
