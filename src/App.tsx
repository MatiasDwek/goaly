import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CompletedTasks from "./components/CompletedTasks";
import GoalyAppBar from "./components/GoalyAppBar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div>
      <GoalyAppBar />
      <Container
        sx={{
          marginY: 4,
        }}
      >
        <Grid container spacing={8} alignItems="center" justifyContent="center">
          <Grid item md={6} sm={12}>
            <Box justifyContent="center" alignItems="center">
              <div>
                <TaskList />
                <TaskForm />
              </div>
            </Box>
          </Grid>
          <Grid item md={6} sm={12}>
            <Box justifyContent="center" alignItems="center">
              <CompletedTasks />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
