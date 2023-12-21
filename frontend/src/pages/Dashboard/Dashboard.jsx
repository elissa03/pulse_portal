import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import SideBar from "../../components/Sidebar/SideBar";
import Home from "../../components/Home/Home";
import Exercises from "../../components/Exercises/Exercises";
import Workouts from "../../components/Workouts/Workouts";
import Users from "../../components/Users/Users";
import Assistant from "../../components/Assistant/Assistant";

function Dashboard({ isAdmin, handleLogout }) {
    const [toggle, setToggle] = useState(true);
    const [activeComponent, setActiveComponent] = useState("home");

    const Toggle = ()  => {
        setToggle(!toggle);
    }

    const showComponent = (componentName) => {
      setActiveComponent(componentName);
    };

  return (
    <div className="container-fluid bg-secondary min-vh-100">
      <div className="row">
        {toggle && (
          <div className="col-4 col-md-3 bg-white vh-100 position-fixed">
            <SideBar
              showComponent={showComponent}
              handleLogout={handleLogout}
              isAdmin={isAdmin}
            />
          </div>
        )}
        {toggle && <div className="col-4 col-md-3"></div>}
        <div className="col">
          {activeComponent === "home" && <Home Toggle={Toggle} />}
          {activeComponent === "exercises" && (
            <Exercises Toggle={Toggle} isAdmin={isAdmin} />
          )}
          {activeComponent === "workouts" && <Workouts Toggle={Toggle} />}
          {activeComponent === "users" && <Users Toggle={Toggle} />}
          {activeComponent === "assistant" && <Assistant Toggle={Toggle}/>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
