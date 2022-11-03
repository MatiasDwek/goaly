import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { initializeCompletedTasks } from "../reducers/completedTasksReducer";
import { CalendarGrid } from "./completedTasks/CalendarGrid";

const CompletedTaskDebug = ({
  date,
  taskId,
}: {
  date: string;
  taskId: string;
}) => {
  return (
    <li>
      Day: {date} - Task ID: {taskId}
    </li>
  );
};

const CompletedTasks = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeCompletedTasks());
  }, [dispatch]);
  const today = new Date();
  const startDay = new Date(today.getFullYear() - 1, today.getMonth(), 6);

  const completedTasks = useAppSelector((state) => state.completedTasks);
  return (
    <div>
      <h1>Completed tasks calendar</h1>
      <CalendarGrid
        startDay={startDay}
        endDay={today}
        completedTasks={completedTasks}
      ></CalendarGrid>
      <ul>
        {completedTasks.map((completedTask) => (
          <CompletedTaskDebug
            key={completedTask.date + completedTask.taskId}
            date={completedTask.date}
            taskId={completedTask.taskId}
          />
        ))}
      </ul>
    </div>
  );
};

export default CompletedTasks;
