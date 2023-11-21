const { query } = require("../database/database");

const getWorkoutsByUser = async (user_id) => {
  try {
    const sql = `SELECT * FROM workouts WHERE user_id = ?;`;
    const workouts = await query(sql, [user_id]);
    return workouts;
  } catch (error) {
    throw new Error(error);
  }
};

const getWorkoutById = async (id) => {
  try {
    const sql = `SELECT * FROM workouts WHERE id = ?;`;
    const results = await query(sql, [id]);
    if (results.length === 0) {
      throw new Error("Workout not found");
    }
    return results[0];
  } catch (error) {
    throw new Error(error);
  }
};

const insertWorkout = async (workoutData) => {
  try {
    const { name, created_date, description, user_id } = workoutData;
    if (!name || !description || !created_date || !user_id) {
      throw new Error("All fields are required to insert a new workout");
    }
    const sql = `INSERT INTO workouts (name, created_date, description, user_id)  VALUES (?, ?, ?, ?);`;
    const result = await query(sql, [name, created_date, description, user_id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(error);
  }
};

const updateWorkout = async (id, workoutData) => {
  try {
    const { name, description } = workoutData;
    const fieldsToUpdate = [];
    const values = [];
    if (name) {
      fieldsToUpdate.push("name = ?");
      values.push(name);
    }
    if (description) {
      fieldsToUpdate.push("description = ?");
      values.push(description);
    }
    if (fieldsToUpdate.length === 0) {
      throw new Error("No valid fields provided to update");
    }
    const sql = `UPDATE workouts SET ${fieldsToUpdate.join(", ")} WHERE id = ?;`;
    values.push(id);
    const result = await query(sql, values);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteWorkout = async (id) => {
  try {
    const sql = `DELETE FROM workouts WHERE id = ?;`;
    const result = await query(sql, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  insertWorkout,
  deleteWorkout,
  getWorkoutsByUser,
  getWorkoutById,
  updateWorkout,
};
