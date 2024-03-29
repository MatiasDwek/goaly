import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Fragment, useState } from "react";
import { useAppDispatch } from "../hooks";
import { useField } from "../hooks/useField";
import { createTask } from "../reducers/tasksReducer";

const TaskForm = () => {
  const title = useField("text");
  const [showCreate, updateShow] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmitTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTask = {
      title: title.value,
    };
    title.reset();
    updateShow(false);
    dispatch(createTask(newTask));
  };

  if (!showCreate) {
    return (
      <Button
        variant="outlined"
        onClick={() => {
          updateShow(true);
        }}
      >
        New Task
      </Button>
    );
  }

  return (
    <Fragment>
      <Typography variant="h6" noWrap component="h6">
        New task
      </Typography>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        autoComplete="off"
        onSubmit={handleSubmitTask}
      >
        <TextField
          required
          id="task-title"
          label="Title"
          defaultValue="Title"
          InputLabelProps={{ required: false }}
          {...title.props}
        />
        <Grid container>
          <Grid item xs={6}>
            <Button
              variant="contained"
              type="submit"
              onClick={() => {
                updateShow(true);
              }}
            >
              Create
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="outlined"
              onClick={() => {
                updateShow(false);
                title.reset();
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default TaskForm;
