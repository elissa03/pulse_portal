const {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require("../services/user.service");

const getUserByIdController = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Error" });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const success = await deleteUser(req.params.id);
    if (success) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserController = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = {
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      user_role: req.body.user_role,
    };
    const success = await updateUser(id, userData);
    if (success) {
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
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
  getAllUsersController,
  getUserByIdController,
  deleteUserController,
  updateUserController,
};
