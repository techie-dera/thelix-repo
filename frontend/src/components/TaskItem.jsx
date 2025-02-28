import { useTask } from "../context/TaskContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskItem = ({ task }) => {
  const { markDone } = useTask();

  const handleMarkDone = async (id) => {
    const success = await markDone(id);

    if (success) {
      // Show a success toast when the task is marked as done
      toast.success(`Task marked as done!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.error("Failed to mark task as done. Please try again.");
    }
  };

  return (
    <div className="task-item">
      <h4>{task.title}</h4>
      <div className="task-content">
        <p>{task.description}</p>
        <button onClick={() => handleMarkDone(task.id)}>Done</button>
      </div>
    </div>
  );
};

export default TaskItem;
