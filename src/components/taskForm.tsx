import { useField } from "../hooks/useField";
import { taskPoints } from "../reducers/tasksReducer";
import tasksService from "../services/tasksService";

const TaskForm = () => {
  const title = useField("text");
  const description = useField("text");
  const points = useField("number");

  const handleSubmitTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTask = {
      title: title.value,
      description: description.value,
      points: parseInt(points.value) as taskPoints,
      creationDate: Date.now(),
    };
    title.reset();
    description.reset();
    tasksService.createTask(newTask);
  };

  return (
    <div>
      <h2>Create a new task</h2>
      <form onSubmit={handleSubmitTask}>
        <div>
          Title
          <input {...title.props} />
        </div>
        <div>
          Description
          <input {...description.props} />
        </div>
        <div>
          Points
          <input {...points.props} min="1" max="3" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default TaskForm;
