const express = require("express");
const router = express.Router();
const authenticateToken = require("./middleware");
const {
  getAllUsersController,
  getUserByIdController,
  deleteUserController,
  updateUserController,
} = require("../controllers/user.controller");


router.get("/users", authenticateToken, getAllUsersController);
router.get("/users/:id", authenticateToken, getUserByIdController);
router.delete("/users/:id", authenticateToken, deleteUserController);
router.put("/users/:id", authenticateToken, updateUserController);
module.exports = router;