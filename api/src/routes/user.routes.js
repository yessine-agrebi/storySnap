import express from "express";
import {
  getAllUsersController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
} from "../controllers/user.controller.js";

const router = express.Router();

// Route for fetching all users
router.get("/", getAllUsersController);

// Route for fetching a single user by their ID
router.get("/:userId", getUserByIdController);

// Route for updating a user by their ID
router.put("/:userId", updateUserByIdController);

// Route for deleting a user by their ID
router.delete("/:userId", deleteUserByIdController);

export default router;
