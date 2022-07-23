import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { completeTask } from "../reducers/completedTasksReducer";

type Day = "today" | "yesterday";

const CheckInForm = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const [day, setDay] = useState<Day>("today");

  const handleComplete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newCompletedTask = {
      date: getFormattedDate(day),
      taskId: id,
    };
    dispatch(completeTask(newCompletedTask));
  };
  return (
    <form onSubmit={handleComplete}>
      <button type="submit" value="today">
        Check in
      </button>
      <select
        name="day"
        value={day}
        onChange={(e) => {
          setDay(e.target.value as Day);
        }}
      >
        <option value="yesterday">Yesterday</option>
        <option value="today">Today</option>
      </select>
    </form>
  );
};

// Returns the date in YYYY/MM/DD format
function getFormattedDate(day: Day): string {
  const date = new Date();
  if (day === "yesterday") {
    date.setDate(date.getDate() - 1);
  }
  return `${date.getUTCFullYear()}/${date.getUTCMonth()}/${date.getUTCDate()}`;
}

export default CheckInForm;
