import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { initializeCompletedTasks } from "../reducers/completedTasksReducer";

const CompletedTask = ({ date, points }: { date: string; points: number }) => {
  return (
    <li>
      Day: {date} --- Day score: {points}
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
            key={completedTask.date}
            date={completedTask.date}
            points={completedTask.points}
          />
        ))}
      </ul>
    </div>
  );
};

export default CompletedTasks;
