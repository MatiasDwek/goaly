import { Typography } from "@mui/material";
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
      <Typography variant="h5" noWrap component="h5">
        Completed tasks calendar
      </Typography>
      <CalendarGrid
        startDay={startDay}
        endDay={today}
        completedTasks={completedTasks}
      ></CalendarGrid>
    </div>
  );
};

export default CompletedTasks;
