import { getAllUsers, getUserById, updateUserById, deleteUserById } from "../services/user.service.js";

// Controller function to handle fetching all users
const getAllUsersController = async (req, res) => {
  try {
    // Get all users from the database
    const allUsers = await getAllUsers();

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

// Controller function to handle fetching a single user by their ID
const getUserByIdController = async (req, res) => {
  try {
    const { userId } = req.params;

    // Get the user by their ID from the database
    const user = await getUserById(userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: "User not found." });
  }
};

// Controller function to handle updating a user by their ID
const updateUserByIdController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { email, password, username, country } = req.body;

    // Update the user by their ID in the database
    const updatedUser = await updateUserById(userId, { email, password, username, country });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user." });
  }
};

// Controller function to handle deleting a user by their ID
const deleteUserByIdController = async (req, res) => {
  try {
    const { userId } = req.params;

    // Delete the user by their ID from the database
    await deleteUserById(userId);

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user." });
  }
};

export { createNewUser, getAllUsersController, getUserByIdController, updateUserByIdController, deleteUserByIdController };
