const { query } = require("../database/database");

const getAllUsers = async () => {
  try {
    const sql = `SELECT * FROM users;`;
    const users = await query(sql);
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserById = async (id) => {
  try {
    const sql = `SELECT * FROM users WHERE id = ?;`;
    const results = await query(sql, [id]);
    if (results.length === 0) {
      throw new Error("User not found");
    }
    return results[0];
  } catch (error) {
    throw new Error(error);
  }
};

const deleteUser = async (id) => {
  try {
    const sql = `DELETE FROM users WHERE id = ?;`;
    const result = await query(sql, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(error);
  }
};

const updateUser = async (id, userData) => {
  try {
    const { email, password, first_name, last_name, user_role } = userData;
    const fieldsToUpdate = [];
    const values = [];
    if (email) {
      fieldsToUpdate.push("email = ?");
      values.push(email);
    }
    if (first_name) {
      fieldsToUpdate.push("first_name = ?");
      values.push(first_name);
    }
    if (last_name) {
      fieldsToUpdate.push("last_name = ?");
      values.push(last_name);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 8);
      fieldsToUpdate.push("password = ?");
      values.push(hashedPassword);
    }
    if (user_role){
        fieldsToUpdate.push("user_role = ?");
        values.push(user_role);
    }
    if (fieldsToUpdate.length === 0) {
      throw new Error("No valid fields provided to update");
    }
    const sql = `UPDATE users SET ${fieldsToUpdate.join(", ")} WHERE id = ?;`;
    values.push(id);
    const result = await query(sql, values);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser
};
