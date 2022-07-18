import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import completedTasksService from "../services/completedTasksService";
import { AppDispatch } from "../store";

export interface CompletedTask {
  date: number; // epoch millis
  points: number;
}

type CompletedTasks = Array<CompletedTask>;

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
