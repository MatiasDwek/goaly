import CompletedTasks from "./components/CompletedTasks";
import GoalyAppBar from "./components/GoalyAppBar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div>
      <GoalyAppBar />
      <TaskList />
      <TaskForm />
      <CompletedTasks />
    </div>
  );
}

export default App;
