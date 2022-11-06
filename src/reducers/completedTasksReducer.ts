import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import completedTasksService from "../services/completedTasksService";
import { AppDispatch } from "../store";
import { CompletedTask, CompletedTasks } from "../types/completedTask";
import { loaded } from "./loadingReducer";

const initialState: CompletedTasks = [];

const completedTasksSlice = createSlice({
  name: "completedTasks",
  initialState: initialState,
  reducers: {
    setCompletedTasks(
      state: CompletedTasks,
      action: PayloadAction<CompletedTasks>
    ) {
      return action.payload;
    },
    appendCompletedTask(
      state: CompletedTasks,
      action: PayloadAction<CompletedTask>
    ) {
      return state.concat(action.payload);
    },
  },
});

export const initializeCompletedTasks = () => {
  return async (dispatch: AppDispatch) => {
    const completedTasks = await completedTasksService.get();
    dispatch(setCompletedTasks(completedTasks));
    dispatch(loaded("completedTasks"));
  };
};

export const completeTask = (content: CompletedTask) => {
  return async (dispatch: AppDispatch) => {
    const newCompletedTask = await completedTasksService.complete(content);
    dispatch(appendCompletedTask(newCompletedTask));
  };
};

export const { setCompletedTasks, appendCompletedTask } =
  completedTasksSlice.actions;
export default completedTasksSlice.reducer;
