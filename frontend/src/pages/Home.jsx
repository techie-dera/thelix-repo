import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "../styles/App.css";

const Home = () => {
  return (
    <div className="container">
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default Home;
