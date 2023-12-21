import { React, useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import workoutService from "../../services/workoutService";
import WorkoutCard from "./WorkoutCard";
import { FaPlus } from "react-icons/fa";
import NewWorkoutModal from "./NewWorkoutModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Workouts({ Toggle }) {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetWorkouts = async () => {
      try {
        const response = await workoutService.getWorkoutsByUser();
        // console.log("here1", response);
        setWorkouts(response.data);
        // console.log("here2", workouts);
      } catch (err) {
        console.error("Error fetching data: ", err);
        setError("Failed to load workouts");
      }
    };
    fetWorkouts();
  }, []);

  const handleDeleteWorkout = async (workoutId) => {
    try {
      const response = await workoutService.deleteWorkout(workoutId);
      console.log(response);
      if (response.status == 200) {
        setWorkouts((currentWorkouts) =>
          currentWorkouts.filter((workout) => workout.id !== workoutId)
        );
      }
    } catch (error) {
      console.error("Failed to delete workout", error);
    }
  };

  const handleUpdateWorkout = async (workoutId, description) => {
    try {
      const response = await workoutService.updateWorkout(
        workoutId,
        description
      );
      if (response.status === 200) {
        setWorkouts((currentWorkouts) =>
          currentWorkouts.map((workout) =>
            workout.id === workoutId
              ? { ...workout, description: description }
              : workout
          )
        );
      }
    } catch (error) {
      console.error("Failed to update workout", error);
    }
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const addNewWorkout = (newWorkout) => {
    setWorkouts([...workouts, newWorkout]);
  };

  return (
    <>
      <div className="px-3">
        <Nav Toggle={Toggle} />
        <div className="container mt-3">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="row">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                onDelete={handleDeleteWorkout}
                onUpdate={handleUpdateWorkout}
              />
            ))}
          </div>
          <div className="d-flex justify-content-center col-12 mb-4">
            <button className="btn btn-primary fab" onClick={handleAddClick}>
              <FaPlus />
            </button>
          </div>
        </div>
        {/* Modal */}
        <NewWorkoutModal
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          addNewWorkout={addNewWorkout}
        />
        {isModalOpen && <div className="modal-backdrop fade show"></div>}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
}

export default Workouts;
