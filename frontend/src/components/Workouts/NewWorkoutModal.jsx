import React, { useState } from "react";
import "./styles.css";
import workoutService from "../../services/workoutService";
import { toast } from "react-toastify";

function NewWorkoutModal({ isModalOpen, handleCloseModal, addNewWorkout }) {
  const [newWorkout, setNewWorkout] = useState({ name: "", description: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewWorkout({ ...newWorkout, [name]: value });
  };

  const handleSaveWorkout = async () => {
    console.log(newWorkout);
    try {
      const response = await workoutService.insertWorkout(newWorkout);
      if (response.status === 200) {
        console.log("Workout saved successfully");
        addNewWorkout(newWorkout);
        handleCloseModal();
        toast.success("Workout was successfully inserted!");
      }
    } catch (error) {
      console.error("Failed to save workout", error);
      toast.error("Failed to insert workout.");
    }
  };

  return (
    <div
      className={`modal fade ${isModalOpen ? "show" : ""}`}
      style={isModalOpen ? { display: "block" } : { display: "none" }}
      tabIndex="-1"
      aria-labelledby="addWorkoutModalLabel"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="addWorkoutModalLabel">
            Create New Workout
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleCloseModal}
          ></button>
        </div>
        <div className="modal-body">
          <div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={newWorkout.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                name="description"
                value={newWorkout.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <button className="btn btn-primary" onClick={handleSaveWorkout}>
              Save Workout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewWorkoutModal;
