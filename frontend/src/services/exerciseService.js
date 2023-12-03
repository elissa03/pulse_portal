import axios from "axios";
import localStorageUtils from "../utils/localStorageUtils";

const API_URL = "http://localhost:3001/exercise/exercises";

const getAllExercises = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorageUtils.getToken()}`,
    },
  });
  return response;
};

const deleteExercise = async (exerciseId) => {
    const response = await axios.delete(`${API_URL}/${exerciseId}`, {
      headers: {
        Authorization: `Bearer ${localStorageUtils.getToken()}`,
      },
    });
    return response;
}

const updateExercise = async (exerciseId, data) => {
    const response = await axios.put(`${API_URL}/${exerciseId}`, data, {
      headers: {
        Authorization: `Bearer ${localStorageUtils.getToken()}`,
      },
    });

    return response
}

const addExercise = async (exerciseData) => {
    const response = await axios.post(API_URL, exerciseData, {
      headers: {
        Authorization: `Bearer ${localStorageUtils.getToken()}`,
      },
    });
    return response;
}

export default {
    getAllExercises,
    deleteExercise,
    updateExercise,
    addExercise
}
