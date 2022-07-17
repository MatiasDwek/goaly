import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import completedTasksService from "../services/completedTasks";
import { AppDispatch } from "../store";

interface CompletedTask {
  date: number; // epoch millis
  points: number;
}

type CompletedTasks = Array<CompletedTask>;

const initialState: CompletedTasks = [];

const completedTasksSlice = createSlice({
  name: "completedTasks",
  initialState: initialState,
  reducers: {
    setCompletedTasks(state, action: PayloadAction<CompletedTasks>) {
      return action.payload;
    },
  },
});

export const initializeCompletedTasks = () => {
  return async (dispatch: AppDispatch) => {
    const completedTasks = await completedTasksService.get();
    dispatch(setCompletedTasks(completedTasks));
  };
};

export const { setCompletedTasks } = completedTasksSlice.actions;
export default completedTasksSlice.reducer;
