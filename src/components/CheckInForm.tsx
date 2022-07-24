import { useState } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { completeTask } from "../reducers/completedTasksReducer";
import { getFormattedDate } from "../utils/dateUtils";
import { Day } from "../utils/dateUtils";

interface CheckInFormProps {
  id: string;
  completedYesterday: boolean;
  completedToday: boolean;
  initDay: Day;
}

const CheckInForm = ({
  id,
  completedToday,
  completedYesterday,
  initDay,
}: CheckInFormProps) => {
  const dispatch = useAppDispatch();
  const [day, setDay] = useState<Day>(initDay);

  useEffect(() => {
    setDay(initDay);
  }, [completedToday]);

  const loading = useAppSelector((state) => state.loading);
  if (loading.completedTasks) {
    return <div>Loading...</div>;
  }

  const handleComplete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newCompletedTask = {
      date: getFormattedDate(day),
      taskId: id,
    };
    setDay(day === "today" ? "yesterday" : "today");
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
        <option value="yesterday" disabled={completedYesterday}>
          Yesterday {completedYesterday && "✅"}
        </option>

        <option value="today" disabled={completedToday}>
          Today {completedToday && "✅"}
        </option>
      </select>
    </form>
  );
};

export default CheckInForm;
