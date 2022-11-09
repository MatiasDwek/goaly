export interface CompletedTask {
  taskId: string;
  date: string;
}

export type CompletedTasks = Array<CompletedTask>;

export type CheckInDay = "today" | "yesterday";
