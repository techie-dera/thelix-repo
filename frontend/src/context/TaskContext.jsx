import { createContext, useState, useContext, useEffect } from "react";
import { fetchTasks, addTask, markTaskAsDone } from "../services/taskService";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks on initial load
  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    getTasks();
  }, []);

  // Add a task
  const handleAddTask = async (title, description) => {
    try {
      const newTask = await addTask(title, description);
      if (newTask) {
        setTasks((prevTasks) => [newTask, ...prevTasks].slice(0, 5));
        return true;
      }
      return false;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  // Mark task as done and refetch tasks
  const handleMarkDone = async (id) => {
    try {
      const success = await markTaskAsDone(id);
      if (success) {
        // After marking as done, refetch tasks to ensure the task list is updated
        const updatedTasks = await fetchTasks();
        setTasks(updatedTasks.slice(0, 5));
        return true;
      }
      return false;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask: handleAddTask, markDone: handleMarkDone }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);