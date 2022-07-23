import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { initializeCompletedTasks } from "../reducers/completedTasksReducer";

const CompletedTask = ({ date, taskId }: { date: string; taskId: string }) => {
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

  const completedTasks = useAppSelector((state) => state.completedTasks);
  return (
    <div>
      <h1>Completed tasks calendar</h1>
      <ul>
        {completedTasks.map((completedTask) => (
          <CompletedTask
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
