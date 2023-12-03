import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import firebaseService from "../../services/firebaseService";
import exerciseService from "../../services/exerciseService";

const NewExerciseModal = ({ isModalOpen, handleCloseModal, addExercise }) => {
  const [newExercise, setNewExercise] = useState({
    name: "",
    description: "",
    sets: "",
    reps: "",
    type: "",
    difficulty: "",
    gif_file: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setNewExercise({ ...newExercise, gif_file: files[0] }); // handle file inputs
    } else {
      setNewExercise({ ...newExercise, [name]: value }); // handle other inputs
    }
  };

  const handleSubmit = async () => {
    if (newExercise.gif_file) {
      console.log(newExercise.gif_file)
      try {
        const uploadResponse = await firebaseService.uploadGifUrl(newExercise.gif_file);
        console.log("upload res",uploadResponse);
        // if the upload is successful, submit the new exercise data with the returned URL
        const exerciseData = {
          ...newExercise,
          gif_url: uploadResponse.name, 
        };
        // remove the gif_file from the data to be sent
        delete exerciseData.gif_file;
        const response = await exerciseService.addExercise(exerciseData);
        if (response.status === 200) {
          toast.success("Exercise Added Successfully", {
            position: "top-center",
            autoClose: 2000,
            onClose: () => {
              handleCloseModal();
              addExercise(response.data); // add the new exercise to the state
            },
          });
          // reset the form state
          setNewExercise({
            name: "",
            description: "",
            sets: "",
            reps: "",
            type: "",
            difficulty: "",
            gif_file: null,
          });
        }
      } catch (error) {
        toast.error("Failed to Upload Exercise", {
          position: "top-center",
          autoClose: 2000,
        });
        console.error("There was an error uploading the file:", error);
      }
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
                  type="file"
                  className="form-control"
                  name="filename"
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
