import "../styles/App.css";
import { useTask } from "../context/TaskContext";

const TaskItem = ({ task }) => {
  const { markDone } = useTask();

  return (
    <div className="task-item">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <button onClick={() => markDone(task.id)}>Done</button>
    </div>
  );
};

export default TaskItem;
