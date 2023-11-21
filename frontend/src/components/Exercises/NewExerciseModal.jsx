import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import localStorageUtils from "../../utils/localStorageUtils";

const NewExerciseModal = ({ isModalOpen, handleCloseModal, addExercise }) => {
  const [newExercise, setNewExercise] = useState({
    name: "",
    description: "",
    sets: "",
    reps: "",
    type: "",
    difficulty: "",
    gif_url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExercise({ ...newExercise, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/exercise/exercises",
        newExercise,
        {
          headers: {
            Authorization: `Bearer ${localStorageUtils.getToken()}`,
          },
        }
      );
      console.log("here", response);
      if (response.status === 200) {
        //console.log("Exercise added:", response.data);
        toast.success("Exercise Added Successfully", {
          position: "top-center",
          autoClose: 2000,
          onClose: () => {
            handleCloseModal();
            addExercise(newExercise);
          },
        });
        
        setNewExercise({
          name: "",
          description: "",
          sets: "",
          reps: "",
          type: "",
          difficulty: "",
          gif_url: "",
        });
      }
    } catch (error) {
      toast.error("Failed to Add Exercise", {
        position: "top-center",
        autoClose: 2000,
      });
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <div
      className={`modal fade ${isModalOpen ? "show" : ""}`}
      style={isModalOpen ? { display: "block" } : { display: "none" }}
      tabIndex="-1"
      aria-labelledby="addExerciseModalLabel"
      aria-modal="true"
      role="dialog"
    >
      <ToastContainer />
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addExerciseModalLabel">
              Add New Exercise
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
                  value={newExercise.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={newExercise.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Sets</label>
                <input
                  type="number"
                  className="form-control"
                  name="sets"
                  value={newExercise.sets}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Reps</label>
                <input
                  type="text"
                  className="form-control"
                  name="reps"
                  value={newExercise.reps}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  className="form-control"
                  name="type"
                  value={newExercise.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Strength">Strength</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Flexibility">Flexibility</option>
                  <option value="Balance">Balance</option>
                </select>
              </div>
              <div className="form-group">
                <label>Difficulty</label>
                <select
                  className="form-control"
                  name="difficulty"
                  value={newExercise.difficulty}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Difficulty</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div className="form-group">
                <label>Gif URL</label>
                <input
                  type="text"
                  className="form-control"
                  name="gif_url"
                  value={newExercise.gif_url}
                  onChange={handleInputChange}
                />
              </div>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Save Exercise
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewExerciseModal;
