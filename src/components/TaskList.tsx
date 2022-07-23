import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { initializeTasks } from "../reducers/tasksReducer";

const Task = ({
  title,
  description,
  points,
}: {
  title: string;
  description: string;
  points: number;
}) => {
  return (
    <li>
      <b>Task</b>: {title} <b>Description</b>: {description} <b>Points</b>: {points}
    </li>
  );
};

const TaskList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeTasks());
  }, [dispatch]);

  const tasks = useAppSelector((state) => state.tasks);
  return (
    <div>
      <h1>Task list</h1>
      <ul>
        {tasks.map((task) => (
          <Task
            key={task.id}
            title={task.title}
            description={task.description}
            points={task.points}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
