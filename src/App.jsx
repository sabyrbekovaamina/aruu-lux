import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";

const App = () => {
  return (
    <div>
      <Layout />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default App;
