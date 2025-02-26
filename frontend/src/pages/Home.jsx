import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "../styles/App.css";

const Home = () => {
  return (
    <div className="container">
      {/* Task Form aligned to the top-left */}
      <div className="task-form-container">
        <TaskForm />
      </div>

      {/* Full height divider */}
      <div className="divider"></div>

      {/* Task List aligned to the top-right */}
      <div className="task-list-container">
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
