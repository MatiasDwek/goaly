import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { completeTask } from "../reducers/completedTasksReducer";

const CompleteTaskForm = () => {
  const [completionDate, setCompletionDate] = useState("");
  const dispatch = useAppDispatch();

  const handleCompleteTask = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const newCompletedTask = {
      date: getFormattedDate(false), // TODO select either yesterday or today
      points: 1,
    };
    dispatch(completeTask(newCompletedTask));
  };

  return (
    <form onSubmit={handleCompleteTask}>
      Date of completion
      <input
        name="CompletedTask"
        value={completionDate}
        type="date"
        onChange={({ target }) => setCompletionDate(target.value)}
      />
      <button type="submit">I did it!</button>
    </form>
  );
};

// Returns the date in YYYY/MM/DD format
function getFormattedDate(dayBefore: boolean): string {
  const date = new Date();
  if (dayBefore) {
    date.setDate(date.getDate() - 1);
  }
  return `${date.getUTCFullYear()}/${date.getUTCMonth()}/${date.getUTCDate()}`;
}

export default CompleteTaskForm;
