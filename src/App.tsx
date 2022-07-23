import CompletedTasks from "./components/CompletedTasks";
import CompleteTask from "./components/CompleteTaskForm";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div>
      <CompletedTasks />
      <CompleteTask />
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
