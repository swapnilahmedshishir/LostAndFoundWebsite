import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./Component/Navbar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Component/Footer/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white transition duration-300">
      <ToastContainer />
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
