import axios from "axios";
import { Task } from "../reducers/tasksReducer";

const baseUrl = "/api/tasks";

const getTask = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createTask = async (task: Task) => {
  const response = await axios.post(baseUrl, task);
  return response.data;
};

const updateTask = async (task: Task) => {
  const response = await axios.put(`${baseUrl}/${task.id}`, task);
  return response.data;
};

const deleteTask = async (taskId: string) => {
  const response = await axios.delete(`${baseUrl}/${taskId}`);
  return response.data;
};

export default {
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
