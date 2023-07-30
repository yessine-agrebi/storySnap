import User from "../models/user.model.js";

// Function to get all users
const getAllUsers = async () => {
  try {
    const allUsers = await User.find();
    return allUsers;
  } catch (error) {
    throw new Error("Failed to fetch users.");
  }
};

// Function to get a single user by their ID
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error("User not found.");
  }
};

// Function to update a user by their ID
const updateUserById = async (userId, updatedData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw new Error("Failed to update user.");
  }
};

// Function to delete a user by their ID
const deleteUserById = async (userId) => {
  try {
    await User.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error("Failed to delete user.");
  }
};

export { createUser, getAllUsers, getUserById, updateUserById, deleteUserById };
