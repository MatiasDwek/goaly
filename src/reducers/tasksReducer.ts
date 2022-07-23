export type taskPoints = 1 | 2 | 3;

export interface Task {
  id?: string;
  title: string;
  description: string;
  points: taskPoints;
  creationDate: number;
}
