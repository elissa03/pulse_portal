import React, { useState } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import exerciseService from "../../services/exerciseService";

function ExerciseCard({
  id,
  gifUrl,
  name,
  description: initialDescription,
  sets: initialSets,
  reps: initialReps,
  type,
  difficulty,
  onDeleteClick,
  exerciseData
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedDescription, setEditedDescription] =
    useState(initialDescription);
  const [editedSets, setEditedSets] = useState(initialSets);
  const [editedReps, setEditedReps] = useState(initialReps);


  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteExercise = async () => {
    console.log(id);
    onDeleteClick(id);
    closeDeleteModal();
  };

  const editExercise = async () => {
    try {

      const response = await exerciseService.updateExercise(id, {
        description: editedDescription,
        sets: editedSets,
        reps: editedReps,
      });

      if (response.status === 200) {
        console.log("Exercise updated successfully", response);

        // Update the local state with the edited exercise
       exerciseData.map((exercise) => {
          if (exercise.id === id) {
            return {
              ...exercise,
              description: editedDescription,
              sets: editedSets,
              reps: editedReps,
            };
          }
          return exercise;
        });

        //setExerciseData(updatedExerciseData);
      } else {
        console.error("Failed to update exercise");
      }
    } catch (error) {
      console.error("Error updating exercise:", error);
    }

    // Toggle back to display mode
    toggleEditMode();
  };



   const toggleEditMode = () => {
     setIsEditMode(!isEditMode);
   };

    const cancelEdit = () => {
      // Reset edited values to initial values and exit edit mode
      setEditedDescription(initialDescription);
      setEditedSets(initialSets);
      setEditedReps(initialReps);
      toggleEditMode();
    };

  return (
    <div className={`card exercise-card difficulty-${difficulty}`}>
      <img
        src={gifUrl}
        alt={`${name} exercise`}
        className="card-img-top exercise-gif"
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>

        {isEditMode ? (
          // Edit mode: Input fields for description, sets, and reps
          <div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Sets</label>
              <input
                type="number"
                className="form-control"
                value={editedSets}
                onChange={(e) => setEditedSets(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Reps</label>
              <input
                type="text"
                className="form-control"
                value={editedReps}
                onChange={(e) => setEditedReps(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={editExercise}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        ) : (
          // Display mode: Static text for description, sets, and reps
          <div>
            <p className="card-text">{initialDescription}</p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Sets: {initialSets}</li>
              <li className="list-group-item">Reps: {initialReps}</li>
              <li className="list-group-item">Type: {type}</li>
              <li className="list-group-item">Difficulty: {difficulty}</li>
            </ul>
            <div className="card-footer-buttons d-flex justify-content-center mt-3">
              <button
                className="btn btn-primary btn-sm"
                onClick={toggleEditMode}
              >
                <FaEdit />
              </button>
              <button
                className="btn btn-danger btn-sm ml-2"
                onClick={openDeleteModal}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        onConfirm={deleteExercise}
        itemName={name}
      />
    </div>
  );
}

export default ExerciseCard;
