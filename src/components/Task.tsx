import { TaskPoints } from "../reducers/tasksReducer";
import CheckInForm from "./CheckInForm";

interface TaskProps {
  title: string;
  points: TaskPoints;
  id: string;
  completed: boolean;
}

const Task = ({ title, points, id, completed }: TaskProps) => {
  return (
    <div>
      <b>{title}</b> - {points} point{points !== 1 ? "s" : ""}
      {!completed && <CheckInForm id={id} />}
      {completed && "✅"}
    </div>
  );
};

export default Task;
