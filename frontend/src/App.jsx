import Home from "./pages/Home";
import { TaskProvider } from "./context/TaskContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <TaskProvider>
      <ToastContainer />
      <Home />
    </TaskProvider>
  );
}

export default App;
