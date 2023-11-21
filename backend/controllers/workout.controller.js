const {
  insertWorkout,
  deleteWorkout,
  getWorkoutsByUser,
  getWorkoutById,
  updateWorkout,
} = require("../services/workout.service");

const insertWorkoutController = async (req, res) => {
  try {
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
    const workoutData = {
      name: req.body.name,
      created_date: currentDate,
      description: req.body.description,
      user_id: req.user.id,
    };
    const success = await insertWorkout(workoutData);
    if (success) {
      res.status(200).json({ message: "Workout inserted successfully" });
    } else {
      res.status(400).json({ message: "Workout could not be inserted" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const deleteWorkoutController = async (req, res) => {
  try {
    const success = await deleteWorkout(req.params.id);
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

const getWorkoutsByUserController = async (req, res) => {
  try {
    const workouts = await getWorkoutsByUser(req.user.id);
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Internal Error" });
  }
};

const getWorkoutByIdController = async (req, res) => {
  try {
    const workout = await getWorkoutById(req.params.id);
    res.status(200).json(workout);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateWorkoutController = async (req, res) => {
  try {
     const id = req.params.id;
     const workoutData ={
      name: req.body.name,
      description: req.body.description,
     }
     const success = await updateWorkout(id, workoutData);
     if (success) {
       res.status(200).json({ message: "Workout updated successfully" });
     } else {
       res.status(404).json({ message: "Workout not found" });
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
  insertWorkoutController,
  deleteWorkoutController,
  getWorkoutsByUserController,
  getWorkoutByIdController,
  updateWorkoutController,
};
