import { configureStore } from '@reduxjs/toolkit'

import calendarReducer from './reducers/calendarReducer'

const store = configureStore({
  reducer: {
    calendar: calendarReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
