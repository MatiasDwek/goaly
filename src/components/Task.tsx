import { useAppSelector } from "../hooks";
import { TaskPoints } from "../reducers/tasksReducer";
import { getFormattedDate } from "../utils/dateUtils";
import CheckInForm from "./CheckInForm";

interface TaskProps {
  title: string;
  points: TaskPoints;
  id: string;
}

const Task = ({ title, points, id }: TaskProps) => {
  const completedTasks = useAppSelector((state) => state.completedTasks);
  const completed = completedTasks.reduce(
    (acc, completedTask) => {
      if (completedTask.taskId !== id) {
        return acc;
      }
      if (completedTask.date === getFormattedDate("today")) {
        return { ...acc, today: true };
      }
      if (completedTask.date === getFormattedDate("yesterday")) {
        return { ...acc, yesterday: true };
      }
      return acc;
    },
    { today: false, yesterday: false }
  );
  const allCompleted = completed.today && completed.yesterday;

  return (
    <div>
      <b>{title}</b> - {points} point{points !== 1 ? "s" : ""}
      {!allCompleted && (
        <CheckInForm
          id={id}
          completedToday={completed.today}
          completedYesterday={completed.yesterday}
          initDay={completed.today ? "yesterday" : "today"}
        />
      )}
      {allCompleted && "✅"}
    </div>
  );
};

export default Task;
