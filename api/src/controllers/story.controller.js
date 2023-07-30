import Story from "../models/story.model.js";
import User from "../models/user.model.js";
import {
  createStory,
  getAllStories,
  getStoryById,
  updateStoryById,
  deleteStoryById,
} from "../services/story.service.js";

// Controller function to handle creating a new story
const createNewStory = async (req, res) => {
  try {
    const { content, userId } = req.body;

    // Create the story in the database
    const newStory = await createStory({ content, userId });

    res.status(201).json(newStory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to handle fetching all stories
const getAllStoriesController = async (req, res) => {
  try {
    const { page, limit, sortBy, sortOrder, country } = req.query;
    const parsedPage = parseInt(page) || 1;
    const parsedLimit = parseInt(limit) || 10;

    let sortQuery = {};
    if (sortBy && sortOrder) {
      sortQuery[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    let userCountryFilter;
    if (country) {
      userCountryFilter = country;
    }

    const { totalStories, stories } = await getAllStories(
      parsedPage,
      parsedLimit,
      sortQuery,
      userCountryFilter
    );

    const totalPages = Math.ceil(totalStories / parsedLimit);

    res.status(200).json({
      page: parsedPage,
      totalPages,
      totalStories,
      stories,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stories." });
  }
};

// Controller function to handle fetching a single story by its ID
const getStoryByIdController = async (req, res) => {
  try {
    const { storyId } = req.params;

    // Get the story by its ID from the database
    const story = await getStoryById(storyId);

    res.status(200).json(story);
  } catch (error) {
    res.status(404).json({ error: "Story not found." });
  }
};

// Controller function to handle updating a story by its ID
const updateStoryByIdController = async (req, res) => {
  try {
    const { storyId } = req.params;
    const { content } = req.body;

    // Update the story by its ID in the database
    const updatedStory = await updateStoryById(storyId, { content });

    res.status(200).json(updatedStory);
  } catch (error) {
    res.status(500).json({ error: "Failed to update story." });
  }
};

// Controller function to handle deleting a story by its ID
const deleteStoryByIdController = async (req, res) => {
  try {
    const { storyId } = req.params;

    // Delete the story by its ID from the database
    await deleteStoryById(storyId);

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete story." });
  }
};

const voteOnStoryController = async (req, res) => {
  try {
    const { userId } = req.body;
    const { storyId } = req.params;

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ error: "Story not found." });
    }

    if (story.votes.includes(userId)) {
      return res
        .status(400)
        .json({ error: "You have already voted on this story." });
    }

    story.votes.push(userId);
    await story.save();

    res.status(200).json({ message: "Voted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to vote on the story." });
  }
};

const leaveCommentOnStoryController = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const { storyId } = req.params;

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ error: "Story not found." });
    }

    // Find the user by userId to get the username
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const comment = {
      userId,
      content,
    };
    story.comments.push(comment);
    await story.save();
    const result = { ...comment, username: user.username };
    res.status(200).json({ message: "Comment added successfully.", result });
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment to the story." });
  }
};

const updateCommentController = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const { storyId, commentId } = req.params;

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ error: "Story not found." });
    }

    const comment = story.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    // Check if the user is the creator of the comment
    if (comment.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this comment." });
    }

    comment.content = content;
    await story.save();

    res.status(200).json({ message: "Comment updated successfully.", comment });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the comment." });
  }
};

const deleteCommentController = async (req, res) => {
  try {
    const { userId } = req.body;
    const { storyId, commentId } = req.params;

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ error: "Story not found." });
    }

    const comment = story.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    // Check if the user is the creator of the comment
    if (comment.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this comment." });
    }

    comment.remove();
    await story.save();

    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the comment." });
  }
};

export {
  createNewStory,
  getAllStoriesController,
  getStoryByIdController,
  updateStoryByIdController,
  deleteStoryByIdController,
  voteOnStoryController,
  leaveCommentOnStoryController,
  updateCommentController,
  deleteCommentController,
};
