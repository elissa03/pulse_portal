const { query } = require("../database/database");

const getExercisesByWorkoutId = async (workoutId) => {
  try {
    const sql = `
      SELECT e.*
      FROM exercises e
      INNER JOIN workout_exercise we ON e.id = we.exercise_id
      WHERE we.workout_id = ?;`;
    const exercises = await query(sql, [workoutId]);
    return exercises;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const deleteExerciseFromWorkout = async (workoutId, exerciseId) => {
  try {
    const deleteWorkoutExerciseQuery =
      "DELETE FROM workout_exercise WHERE workout_id = ? AND exercise_id = ?";
    const result = await query(deleteWorkoutExerciseQuery, [workoutId, exerciseId]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(error);
  }
};

const insertExerciseToWorkout = async (workoutId, exerciseId) => {
  try {
    const insertWorkoutExerciseQuery =
      "INSERT INTO workout_exercise (workout_id, exercise_id) VALUES (?, ?);";
    const result = await query(insertWorkoutExerciseQuery, [workoutId, exerciseId]);
    return result.affectedRows > 0; 
  } catch (error) {
    throw new Error(error);
  }
};


module.exports = {
  getExercisesByWorkoutId,
  deleteExerciseFromWorkout,
  insertExerciseToWorkout,
};
