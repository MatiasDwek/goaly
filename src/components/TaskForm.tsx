import { useAppDispatch } from "../hooks";
import { useField } from "../hooks/useField";
import { createTask, TaskPoints } from "../reducers/tasksReducer";

const TaskForm = () => {
  const title = useField("text");
  const points = useField("number");
  const dispatch = useAppDispatch();

  const handleSubmitTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTask = {
      title: title.value,
      points: parseInt(points.value) as TaskPoints,
    };
    title.reset();
    points.reset();
    dispatch(createTask(newTask));
  };

  return (
    <div>
      <h2>Create a new task</h2>
      <form onSubmit={handleSubmitTask}>
        <div>
          Title
          <input {...title.props} required />
        </div>
        <div>
          Points
          <input {...points.props} min="1" max="3" required />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default TaskForm;
