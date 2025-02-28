import axios from "axios";

const API_URL = "/api/tasks";  

// Fetch tasks
export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching tasks");
  }
};

// Add task
export const addTask = async (title, description) => {
  try {
    const response = await axios.post(API_URL, { title, description });
    return response.status === 201 ? response.data : null;
  } catch (error) {
    throw new Error("Error adding task");
  }
};

// Mark task as done
export const markTaskAsDone = async (id) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`);
    return response.status === 200;
  } catch (error) {
    throw new Error("Error marking task as done");
  }
};