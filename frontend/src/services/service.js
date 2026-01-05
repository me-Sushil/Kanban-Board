import axios from "axios";

const baseUrl = import.meta.env.VITE_URL;
const getTask = async () => {
  const response = await axios.get(`${baseUrl}/api/task`);
  return response.data;
};

const addTask = async (task, status) => {
  const taskObj = {
    task: task,
    status: status,
  };
  const response = await axios.post(`${baseUrl}/api/task`, taskObj);
  return response.data;
};

export default { addTask, getTask };
