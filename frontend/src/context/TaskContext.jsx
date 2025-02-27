import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create Context
const TaskContext = createContext();

// Provider Component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add Task
  const addTask = async (title, description) => {
    try {
      const response = await axios.post("http://localhost:5000/api/tasks", {
        title,
        description,
      });
      setTasks((prev) => [response.data, ...prev].slice(0, 5)); // Keep only 5 recent tasks
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Mark Task as Done
  const markDone = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks(); // Re-fetch tasks to always keep 5 displayed
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  };

  // Fetch tasks on initial load
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, markDone }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom Hook
export const useTask = () => {
  return useContext(TaskContext);
};
