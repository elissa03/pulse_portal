const { getExercisesByWorkoutIdController, deleteExerciseFromWorkoutController, insertExerciseToWorkoutController } = require("../controllers/exercise_workout.controller");
const express = require("express");
const router = express.Router();
const authenticateToken = require("./middleware");

router.get(
  "/exercises/:id",
  authenticateToken,
  getExercisesByWorkoutIdController
);
router.delete(
  "/workouts/:workoutId/exercises/:exerciseId",
  authenticateToken, 
  deleteExerciseFromWorkoutController
);
router.post(
  "/workouts/exercises",
  authenticateToken,
  insertExerciseToWorkoutController
);
module.exports = router;