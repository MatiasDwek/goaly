import axios from "axios";
import { CompletedTask } from "../reducers/completedTasksReducer";

const baseUrl = "/api/completed-tasks";

const get = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const complete = async (completedTask: CompletedTask) => {
  const response = await axios.post(`${baseUrl}`, completedTask); // TODO fixed id for now
  return response.data;
};

export default {
  get,
  complete,
};
