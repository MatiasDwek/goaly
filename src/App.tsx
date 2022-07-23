import CompletedTasks from "./components/CompletedTasks";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div>
      <TaskList />
      <TaskForm />
      <CompletedTasks />
    </div>
  );
}

export default App;
