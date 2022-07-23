import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { initializeTasks } from "../reducers/tasksReducer";
import Task from "./Task";

const TaskList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeTasks());
  }, [dispatch]);

  const tasks = useAppSelector((state) => state.tasks);
  const completedTasks = useAppSelector((state) => state.completedTasks);
  return (
    <div>
      <h1>Task list</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Task
              id={task.id as string}
              title={task.title}
              points={task.points}
              completed={!!completedTasks.find(
                (completed) => completed.taskId === task.id
              )}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
