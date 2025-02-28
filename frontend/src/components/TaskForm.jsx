import { useState } from "react";
import { useTask } from "../context/TaskContext";
import { toastSuccess, toastError } from "../utils/utils";

const TaskForm = () => {
  const { addTask } = useTask();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if title or description are empty
    if (!title.trim() || !description.trim()) {
      setError("Both Title and Description are required.");
      return;
    }

    const success = await addTask(title, description);
    if (success) {
      toastSuccess("Task added successfully!");
      setTitle("");
      setDescription("");
      setError("");
    } else {
      toastError("Failed to add task. Please try again.");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>Add a Task</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Inline error message */}
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;