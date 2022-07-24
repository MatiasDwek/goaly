import { configureStore } from "@reduxjs/toolkit";
import completedTasksReducer from "./reducers/completedTasksReducer";
import loadingReducer from "./reducers/loadingReducer";
import tasksReducer from "./reducers/tasksReducer";

const store = configureStore({
  reducer: {
    completedTasks: completedTasksReducer,
    tasks: tasksReducer,
    loading: loadingReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
