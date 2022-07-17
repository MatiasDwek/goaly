import { useState, useEffect } from 'react';
import { initializeCalendar } from './reducers/calendarReducer';
import { useAppDispatch, useAppSelector } from './hooks';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeCalendar()) 
  },[dispatch]);

  const calendar = useAppSelector((state) => state.calendar);
  return (
    <div>
      <h1>Task calendar</h1>
      <ul>
        {calendar.map(day =>
          <li key={day.date}>
            Day: {epochToDay(day.date)} Day score: {day.points}
          </li>)}
      </ul>
    </div>
  );
}

function epochToDay(epochDate: number): string {
  const date = new Date(epochDate);
  const stringDate = date.toLocaleString();
  return stringDate.substring(stringDate.indexOf(","),length)
}

export default App;