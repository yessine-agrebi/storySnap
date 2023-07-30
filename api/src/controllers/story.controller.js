import Story from "../models/story.model.js";
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
    const { page, limit } = req.query;
    const parsedPage = parseInt(page) || 1;
    const parsedLimit = parseInt(limit) || 10;

    const { totalStories, stories } = await getAllStories(
      parsedPage,
      parsedLimit
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

export {
  createNewStory,
  getAllStoriesController,
  getStoryByIdController,
  updateStoryByIdController,
  deleteStoryByIdController,
  voteOnStoryController,
};
