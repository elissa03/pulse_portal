const {
  getAllExercises,
  getExerciseById,
  insertExercise,
  deleteExercise,
  updateExercise,
} = require("../services/exercise.service");


const getExerciseByIdController = async (req, res) => {
  try {
    const exercise = await getExerciseById(req.params.id);
    res.status(200).json(exercise);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllExercisesController = async (req, res) => {
  try {
    const exercises = await getAllExercises();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Internal Error" });
  }
};

const insertExerciseController = async (req, res) => {
  try {
    const exerciseData = {
        name: req.body.name,
        description: req.body.description,
        sets: req.body.sets,
        reps: req.body.reps,
        type: req.body.type,
        difficulty: req.body.difficulty,
        gif_url: req.body.gif_url
    }
    const success = await insertExercise(exerciseData);
    if(success){
        res.status(200).json({ message: "Exercise inserted successfully" });
    } else {
         res.status(400).json({ message: "Exercise could not be inserted" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const deleteExerciseController = async (req, res) => {
  try {
    const success = await deleteExercise(req.params.id);
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

const updateExerciseController = async (req, res) => {
  try {
    const id = req.params.id;
    const exerciseData = {
      name: req.body.name,
      description: req.body.description,
      sets: req.body.sets,
      reps: req.body.reps,
      type: req.body.type,
      difficulty: req.body.difficulty,
    };
    const success = await updateExercise(id, exerciseData);
    if (success) {
      res.status(200).json({ message: "Exercise updated successfully" });
    } else {
      res.status(404).json({ message: "Exercise not found" });
    }
  } catch (error) {
    console.error(error.message);
    if (error.message === "No valid fields provided to update") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = {
  getExerciseByIdController,
  getAllExercisesController,
  insertExerciseController,
  deleteExerciseController,
  updateExerciseController,
};
