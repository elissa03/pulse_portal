import { useState } from "react";
import {
  Outlet,
  Route,
  Routes,
  BrowserRouter as Router,
  Link,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import localStorageUtils from "./utils/localStorageUtils";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/");
  };

  const isAdmin = () => {
    const user = localStorageUtils.getLocalStorageUser();
    if (user?.user_role === "admin") {
      return true;
    }
    return false;
  };

  return (
    <div>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Dashboard isAdmin={isAdmin()} handleLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
