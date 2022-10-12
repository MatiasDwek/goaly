import ListItemText from "@mui/material/ListItemText";
import { useAppSelector } from "../hooks";
import { getFormattedDate } from "../utils/dateUtils";
import { SplitButton } from "./CheckInForm";

interface TaskProps {
  title: string;
  id: string;
}

const Task = ({ title, id }: TaskProps) => {
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

  return (
    <div>
      <ListItemText primary={title} />
      <SplitButton
        id={id}
        completedToday={completed.today}
        completedYesterday={completed.yesterday}
        initDay={completed.today ? "yesterday" : "today"}
      />
    </div>
  );
};

export default Task;
