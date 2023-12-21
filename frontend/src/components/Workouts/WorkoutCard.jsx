import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faEdit,
  faTrashAlt,
  faEye,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import workoutService from "../../services/workoutService";

function WorkoutCard({ workout, onDelete, onUpdate }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState(
    workout.description
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [exercises, setExercises] = useState([]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteClick = () => {
    onDelete(workout.id);
    closeDeleteModal();
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setEditedDescription(workout.description);
  };

  const handleSaveEdit = () => {
    onUpdate(workout.id, editedDescription);
    setIsEditMode(false);
  };

  const toggleExpanded = async () => {
    if (!isExpanded) {
      try {
        const response = await workoutService.getExercisesByWorkout(workout.id);
        setExercises(response.data);
      } catch (error) {
        console.error("Failed to fetch exercises", error);
      }
    }
    setIsExpanded(!isExpanded);
  };

  // Function to delete an exercise from the workout
  const handleDeleteExercise = async (exerciseId) => {
    try {
      await workoutService.deleteExerciseFromWorkout(workout.id, exerciseId);
      console.log(
        `Exercise with ID: ${exerciseId} deleted from workout with ID: ${workout.id}`
      );
       const updatedExercises = exercises.filter(
         (exercise) => exercise.id !== exerciseId
       );
       setExercises(updatedExercises);
    } catch (error) {
      console.error("Failed to delete exercise", error);
    }


  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm hover-shadow">
        <div className="card-header bg-primary text-white text-center">
          <FontAwesomeIcon icon={faDumbbell} /> {workout.name}
        </div>
        <div className="card-body">
          {isEditMode ? (
            <textarea
              className="form-control"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          ) : (
            <p className="card-text">{workout.description}</p>
          )}
        </div>
        <div className="card-footer bg-light">
          <small className="text-muted">
            <FontAwesomeIcon icon={faEdit} className="mr-2" />
            Created on: {formatDate(workout.created_date)}
          </small>
          <div className="float-right">
            {isEditMode ? (
              <>
                <button
                  className="btn btn-sm btn-success mr-2"
                  title="Save Changes"
                  onClick={handleSaveEdit}
                >
                  <FontAwesomeIcon icon={faSave} />
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  title="Cancel Edit"
                  onClick={toggleEditMode}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-sm btn-light mr-2"
                  title="View Workout"
                  onClick={toggleExpanded}
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button
                  className="btn btn-sm btn-warning text-white mr-2"
                  title="Edit Workout"
                  onClick={toggleEditMode}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  title="Delete Workout"
                  onClick={openDeleteModal}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </>
            )}
          </div>
        </div>
        {isExpanded && (
          <div className="card-body">
            {exercises.length > 0 ? (
              exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>{exercise.name}</span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteExercise(exercise.id)}
                    title="Remove Exercise"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              ))
            ) : (
              <p>No exercises in this workout.</p>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        onConfirm={handleDeleteClick}
        itemName={workout.name}
      />
    </div>
  );
}

export default WorkoutCard;
