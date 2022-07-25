import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LoadingComponents = "tasks" | "completedTasks";

interface LoadingState {
  tasks: boolean;
  completedTasks: boolean;
}

const initialState = {
  tasks: true,
  completedTasks: true,
};

const loadingSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    loaded(state: LoadingState, action: PayloadAction<LoadingComponents>) {
      const updatedState = { ...state };
      updatedState[action.payload] = false;
      return updatedState;
    },
  },
});

export const { loaded } = loadingSlice.actions;
export default loadingSlice.reducer;
