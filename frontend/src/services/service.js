import axios from "axios";

const baseUrl = import.meta.env.VITE_URL;
const getTask = async () => {
  const response = await axios.get(`${baseUrl}/task`);
  return response.data;
};

const addTask = async (task) => {
  const response = await axios.post(`${baseUrl}/task`, task);
  return response.data;
};

export default { addTask, getTask };
