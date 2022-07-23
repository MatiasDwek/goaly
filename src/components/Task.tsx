import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { completeTask } from "../reducers/completedTasksReducer";
import { TaskPoints } from "../reducers/tasksReducer";

type Day = "today" | "yesterday";

interface TaskProps {
  title: string;
  points: TaskPoints;
  id: string;
}

const Task = ({ title, points, id }: TaskProps) => {
  const dispatch = useAppDispatch();
  const [day, setDay] = useState<Day>("today");

  const handleComplete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newCompletedTask = {
      date: getFormattedDate(day),
      taskId: id,
    };
    dispatch(completeTask(newCompletedTask));
  };

  return (
    <div>
      <b>{title}</b> - {points} point{points !== 1 ? "s" : ""}
      <form onSubmit={handleComplete}>
        <button type="submit" value="today">
          Completed
        </button>
        <select
          name="day"
          value={day}
          onChange={(e) => {
            setDay(e.target.value as Day);
          }}
        >
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
        </select>
      </form>
    </div>
  );
};

// Returns the date in YYYY/MM/DD format
function getFormattedDate(day: Day): string {
  const date = new Date();
  if (day === "yesterday") {
    date.setDate(date.getDate() - 1);
  }
  return `${date.getUTCFullYear()}/${date.getUTCMonth()}/${date.getUTCDate()}`;
}

export default Task;
