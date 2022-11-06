import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { initializeTasks } from "../reducers/tasksReducer";
import TaskElement from "./TaskElement";

const TaskList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeTasks());
  }, [dispatch]);

  const tasks = useAppSelector((state) => state.tasks);
  const loading = useAppSelector((state) => state.loading);
  if (loading.tasks) {
    return <div>Loading your tasks...</div>;
  }
  return (
    <div>
      <Typography variant="h5" noWrap component="h5">
        Task list
      </Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {tasks.map((task) => (
          <div key={task.id}>
            <ListItem>
              <TaskElement id={task.id as string} title={task.title} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
};

export default TaskList;
