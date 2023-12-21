import React from "react";
import "./styles.css";

function SideBar({ showComponent, handleLogout, isAdmin }) {
  console.log(isAdmin)
  return (
    <div className="bg-white p-2">
      <div className="m-2">
        <i className="bi bi-heart-pulse-fill me-3 fs-4"></i>
        <span className="brand-name fs-4">Pulse Portal</span>
      </div>
      <hr className="text-dark"></hr>
      <div className="list-group list-group-flush">
        <a
          className="list-group-item py-2"
          onClick={() => showComponent("home")}
        >
          <i className="bi bi-house fs-5 me-3"></i>
          <span>Home</span>
        </a>
        <a
          className="list-group-item py-2"
          onClick={() => showComponent("exercises")}
        >
          <i className="bi bi-activity fs-5 me-3"></i>
          <span>Exercises</span>
        </a>
        <a
          className="list-group-item py-2"
          onClick={() => showComponent("workouts")}
        >
          <i className="bi bi-calendar-check fs-5 me-3"></i>
          <span>Workouts</span>
        </a>
        <a
          className="list-group-item py-2"
          onClick={() => showComponent("assistant")}
        >
          <i className="bi bi-journal-bookmark fs-5 me-3"></i>
          <span>Virtual Assistant</span>
        </a>
        {isAdmin && (
          <a
            className="list-group-item py-2"
            onClick={() => showComponent("users")}
          >
            <i className="bi bi-people fs-5 me-3"></i>
            <span>User Management</span>
          </a>
        )}
        <a className="list-group-item py-2" onClick={handleLogout}>
          <i className="bi bi-power fs-5 me-3"></i>
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
}

export default SideBar;
