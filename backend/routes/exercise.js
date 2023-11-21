const express = require("express");
const authenticateToken = require("./middleware");
const router = express.Router();
const {
  getExerciseByIdController,
  getAllExercisesController,
  insertExerciseController,
  deleteExerciseController,
  updateExerciseController,
} = require("../controllers/exercise.controller");

router.get("/exercises", authenticateToken, getAllExercisesController);
router.get("/exercises/:id", authenticateToken, getExerciseByIdController);
router.post("/exercises", authenticateToken, insertExerciseController);
router.delete("/exercises/:id", authenticateToken, deleteExerciseController);
router.put("/exercises/:id", authenticateToken, updateExerciseController);

module.exports = router;
