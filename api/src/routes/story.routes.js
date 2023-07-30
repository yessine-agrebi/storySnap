import express from "express";
import {
  createNewStory,
  getAllStoriesController,
  getStoryByIdController,
  updateStoryByIdController,
  deleteStoryByIdController,
  voteOnStoryController,
  leaveCommentOnStoryController,
  updateCommentController,
  deleteCommentController,
} from "../controllers/story.controller.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();

// Route for creating a new story
router.post("/", createNewStory);

// Route for fetching all stories
router.get("/", authorize(["user"]), getAllStoriesController);

// Route for fetching a single story by its ID
router.get("/:storyId", getStoryByIdController);

// Route for updating a story by its ID
router.put("/:storyId", updateStoryByIdController);

// Route for deleting a story by its ID
router.delete("/:storyId", deleteStoryByIdController);

router.post("/:storyId/vote", voteOnStoryController);

router.post("/:storyId/comment", leaveCommentOnStoryController);

// Route for updating a comment
router.put("/:storyId/comment/:commentId", updateCommentController);

router.delete("/:storyId/comment/:commentId", deleteCommentController);

export default router;
