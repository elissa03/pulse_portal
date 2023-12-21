import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import workoutService from "../../services/workoutService";

function AddExerciseToWorkoutModal({ isOpen, onClose, exerciseId, exerciseName }) {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState("");

  const handleWorkoutChange = (event) => {
    setSelectedWorkout(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedWorkout) {
      alert("Please select a workout.");
      return;
    }
    try {
        await workoutService.addExerciseToWorkout(exerciseId, selectedWorkout);
        console.log(
          `Exercise ${exerciseId} added to workout ${selectedWorkout}`
        );
        onClose();
    } catch (error) {
        console.error("Failed to add exercise to workout:", error);
    }
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await workoutService.getWorkoutsByUser(); // Ensure this method exists and returns all workouts
        setWorkouts(response.data); // Assume the response has the data array with workouts
      } catch (error) {
        console.error("Failed to fetch workouts", error);
      }
    };

    if (isOpen) {
      fetchWorkouts();
    }
  }, [isOpen]);

  return isOpen ? (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add {exerciseName} to Workout</h5>
          <button onClick={onClose} className="close-button">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <select
              value={selectedWorkout}
              onChange={(e) => setSelectedWorkout(e.target.value)}
            >
              <option value="">Select a workout</option>
              {workouts.map((workout) => (
                <option key={workout.id} value={workout.id}>
                  {workout.name}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary">
              Add to Workout
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

export default AddExerciseToWorkoutModal;
