import { configureStore } from "@reduxjs/toolkit";
import completedTasksReducer from "./reducers/completedTasksReducer";

const store = configureStore({
  reducer: {
    completedTasks: completedTasksReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
