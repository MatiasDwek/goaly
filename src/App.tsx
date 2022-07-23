import CompletedTasks from "./components/completedTasks";
import CompleteTask from "./components/completeTask";
import TaskForm from "./components/taskForm";
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
