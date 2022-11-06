import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import tasksService from "../services/tasksService";
import { AppDispatch } from "../store";
import { Task } from "../types/task";
import { loaded } from "./loadingReducer";

const initialState: Task[] = [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    setTasks(state: Task[], action: PayloadAction<Task[]>) {
      return action.payload;
    },
    appendTask(state: Task[], action: PayloadAction<Task>) {
      return state.concat(action.payload);
    },
  },
});

export const initializeTasks = () => {
  return async (dispatch: AppDispatch) => {
    const tasks = await tasksService.getAllTasks();
    dispatch(setTasks(tasks));
    dispatch(loaded("tasks"));
  };
};

export const createTask = (task: Task) => {
  return async (dispatch: AppDispatch) => {
    const newtask = await tasksService.createTask(task);
    dispatch(appendTask(newtask));
  };
};

export const { setTasks, appendTask } = tasksSlice.actions;
export default tasksSlice.reducer;
