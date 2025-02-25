import { createContext, useState, useContext } from "react";

// Create Context
const TaskContext = createContext();

// Provider Component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Add Task
  const addTask = (title, description) => {
    const newTask = { id: Date.now(), title, description };
    setTasks((prev) => [newTask, ...prev].slice(0, 5)); // Keep only 5 recent tasks
  };

  // Mark Task as Done
  const markDone = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

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
