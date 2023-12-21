import axios from "axios";
import localStorageUtils from "../utils/localStorageUtils";

const API_URL = "http://localhost:3001/workout/workouts";

const getWorkoutsByUser = async () => {
  const response = await axios.get(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${localStorageUtils.getToken()}`,
    },
  });
  return response;
};

const deleteWorkout = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorageUtils.getToken()}`,
    },
  });
  return response;
};

const updateWorkout = async (id, description) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    {
      description: description,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorageUtils.getToken()}`,
      },
    }
  );
  return response;
};

const insertWorkout = async (data) => {
  const response = await axios.post(`${API_URL}`, data, {
    headers: {
      Authorization: `Bearer ${localStorageUtils.getToken()}`,
    },
  });
  return response;
};

const API_URL2 = `http://localhost:3001/ex-wo/workouts/exercises`;
const addExerciseToWorkout = async (exerciseId, workoutId) => {
  const response = await axios.post(
    `${API_URL2}`,
    {
      exercise_id: exerciseId,
      workout_id: workoutId,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorageUtils.getToken()}`,
      },
    }
  );
  return response;
};

const API_URL3 = `http://localhost:3001/ex-wo`;
const getExercisesByWorkout = async (workoutId) => {
  const response = await axios.get(`${API_URL3}/${workoutId}`, {
    headers: {
      Authorization: `Bearer ${localStorageUtils.getToken()}`,
    },
  });
  return response;
};

const deleteExerciseFromWorkout = async(workoutId, exerciseId) => {
  const response = await axios.delete(
    `${API_URL3}/${workoutId}/${exerciseId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorageUtils.getToken()}`,
      },
    }
  );
  return response;
}

export default {
  getWorkoutsByUser,
  deleteWorkout,
  updateWorkout,
  insertWorkout,
  addExerciseToWorkout,
  getExercisesByWorkout,
  deleteExerciseFromWorkout
};
