const express = require("express");
const router = express.Router();
const authenticateToken = require("./middleware")

const {
  insertWorkoutController,
  deleteWorkoutController,
  getWorkoutsByUserController,
  getWorkoutByIdController,
  updateWorkoutController,
} = require("../controllers/workout.controller");

router.post("/workouts", authenticateToken, insertWorkoutController);
router.get("/workouts/:id", authenticateToken, getWorkoutByIdController);
router.delete("/workouts/:id", authenticateToken, deleteWorkoutController);
router.put("/workouts/:id", authenticateToken, updateWorkoutController);
router.get("/workouts", authenticateToken, getWorkoutsByUserController);

module.exports = router;