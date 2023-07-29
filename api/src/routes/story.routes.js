import express from "express";
import {
  createNewStory,
  getAllStoriesController,
  getStoryByIdController,
  updateStoryByIdController,
  deleteStoryByIdController,
} from "../controllers/story.controller.js";

const router = express.Router();

// Route for creating a new story
router.post("/", createNewStory);

// Route for fetching all stories
router.get("/", getAllStoriesController);

// Route for fetching a single story by its ID
router.get("/:storyId", getStoryByIdController);

// Route for updating a story by its ID
router.put("/:storyId", updateStoryByIdController);

// Route for deleting a story by its ID
router.delete("/:storyId", deleteStoryByIdController);

export default router;