import { createStory, getAllStories, getStoryById, updateStoryById, deleteStoryById } from "../services/story.service.js";

// Controller function to handle creating a new story
const createNewStory = async (req, res) => {
  try {
    const { content, userId } = req.body;

    // Create the story in the database
    const newStory = await createStory({ content, userId });

    res.status(201).json(newStory);
  } catch (error) {
    res.status(500).json({ error: "Failed to create story." });
  }
};

// Controller function to handle fetching all stories
const getAllStoriesController = async (req, res) => {
  try {
    // Get all stories from the database
    const allStories = await getAllStories();

    res.status(200).json(allStories);
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

export { createNewStory, getAllStoriesController, getStoryByIdController, updateStoryByIdController, deleteStoryByIdController };
