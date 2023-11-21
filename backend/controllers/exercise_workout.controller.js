const {
  getExercisesByWorkoutId,
  deleteExerciseFromWorkout,
  insertExerciseToWorkout
} = require("../services/exercise_workout.service");

const getExercisesByWorkoutIdController = async (req, res) => {
  try {
    const workoutId = req.params.id;
    const exercises = await getExercisesByWorkoutId(workoutId);
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Internal Error" });
  }
};

const deleteExerciseFromWorkoutController = async (req, res) => {
  try {
    const workoutId = req.params.workoutId;
    const exerciseId = req.params.exerciseId;
    const success = await deleteExerciseFromWorkout(workoutId, exerciseId);
    if (success) {
      res.status(200).json({ message: "Exercise deleted successfully" });
    } else {
      res.status(404).json({ message: "Exercise not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const insertExerciseToWorkoutController = async (req, res) => {
  try {
    const workoutId = req.body.workout_id; 
    const exerciseId = req.body.exercise_id; 

    const success = await insertExerciseToWorkout(workoutId, exerciseId);

    if (success) {
      res
        .status(201)
        .json({ message: "Exercise added successfully to workout" });
    } else {
      res.status(400).json({ message: "Could not add exercise to workout" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = {
  getExercisesByWorkoutIdController,
  deleteExerciseFromWorkoutController,
  insertExerciseToWorkoutController,
};
