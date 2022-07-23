import { configureStore } from "@reduxjs/toolkit";
import completedTasksReducer from "./reducers/completedTasksReducer";
import tasksReducer from "./reducers/tasksReducer";

const store = configureStore({
  reducer: {
    completedTasks: completedTasksReducer,
    tasks: tasksReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
