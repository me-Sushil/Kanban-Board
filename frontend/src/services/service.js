import axios from "axios";

const baseUrl = import.meta.env.VITE_URL;
const getTask = async () => {
  const response = await axios.get(`${baseUrl}/api/tasks`);
  return response.data;
};

const addTask = async (task, status) => {
  const taskObj = {
    task: task,
    status: status,
  };
  const response = await axios.post(`${baseUrl}/api/tasks`, taskObj);
  return response.data;
};

const deleteTask = async (id) => {
  const response = await axios.delete(`${baseUrl}/api/tasks/${id}`);
  return response.data;
};

const updateTask = async (id, data) => {
  const response = await axios.put(`${baseUrl}/api/tasks/${id}`, data);
  return response.data;
};

export default { addTask, getTask, deleteTask, updateTask };
