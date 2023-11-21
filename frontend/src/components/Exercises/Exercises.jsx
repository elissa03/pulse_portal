import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import ExerciseCard from "./ExerciseCard";
import * as exerciseGifs from "../../utils/exercisegifs";
import localStorageUtils from "../../utils/localStorageUtils";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus } from "react-icons/fa";
import NewExerciseModal from "./NewExerciseModal";

function Exercises({ Toggle, isAdmin }) {
  const [exerciseData, setExerciseData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const convertToCamelCase = (str) => {
    return str.replace(/-./g, (x) => x[1].toUpperCase());
  };

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/exercise/exercises",
          {
            headers: {
              Authorization: `Bearer ${localStorageUtils.getToken()}`,
            },
          }
        );
        if (response.status === 200) {
          const exercisesWithGifPaths = response.data.map((exercise) => {
            // Convert and find the correct import
            const gifKey = convertToCamelCase(
              exercise.gif_url.replace(".gif", "")
            );
            const gifUrl = exerciseGifs[gifKey];

            return {
              ...exercise,
              gifUrl: gifUrl,
            };
          });

          setExerciseData(exercisesWithGifPaths);
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercises();
  }, [exerciseData]);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const addExercise = (newExercise) => {
    // update the local state with the new exercise
    setExerciseData([...exerciseData, newExercise]);
  };

  const deleteExercise = async(id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/exercise/exercises/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorageUtils.getToken()}`,
          },
        }
      );
      if (response.status === 200) {
        // Remove the deleted exercise from the local state
        const updatedExercises = exerciseData.filter(
          (exercise) => exercise.id !== id
        );
        setExerciseData(updatedExercises);
        console.log("Exercise deleted successfully");
      } else {
        console.error("Failed to delete exercise");
      }
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  }

  return (
    <div className="container mt-4">
      <Nav Toggle={Toggle} />
      <div className="row">
        {exerciseData.map((exercise, index) => (
          <div key={index} className="col-lg-4 col-md-6 col-12 mb-4">
            <ExerciseCard
              {...exercise}
              onDeleteClick={deleteExercise}
              exerciseData={exerciseData}
            />
          </div>
        ))}
        {/* "+" Button */}
        {isAdmin && (
          <div className="d-flex justify-content-center col-12 mb-4">
            <button className="btn btn-primary fab" onClick={handleAddClick}>
              <FaPlus />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <NewExerciseModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        addExercise={addExercise}
      />
      {isModalOpen && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default Exercises;