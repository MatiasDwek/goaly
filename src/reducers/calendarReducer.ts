import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import calendarService from '../services/calendar'
import { AppDispatch } from '../store'

interface Day {
  date: number, // epoch millis
  points: number
}

type Calendar = Array<Day>

const initialState: Calendar = []

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: initialState,
  reducers: {
    setCalendar(state, action: PayloadAction<Calendar>) {
      return action.payload
    }
  },
})

export const initializeCalendar = () => {
  return async (dispatch: AppDispatch) => {
    const calendar = await calendarService.get()
    dispatch(setCalendar(calendar))
  }
}

export const { setCalendar } = calendarSlice.actions
export default calendarSlice.reducer