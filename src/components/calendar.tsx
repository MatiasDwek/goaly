import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { initializeCalendar } from '../reducers/calendarReducer'

const Day = ({ date, points }: {date: number, points: number}) => {
  return(
    <li>
      Day: {epochToDay(date)} --- Day score: {points}
    </li>
  )
}

const Calendar = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeCalendar()) 
  },[dispatch]);

  const calendar = useAppSelector((state) => state.calendar);
  return(
    <div>
      <h1>Task calendar</h1>
      <ul>
        {calendar.map(day =>
          <Day key={day.date} date={day.date} points={day.points}/>)
        }
      </ul>
    </div>
  )
}

function epochToDay(epochDate: number): string {
  const date = new Date(epochDate);
  const stringDate = date.toLocaleString();
  return stringDate.substring(stringDate.indexOf(","),length)
}

export default Calendar