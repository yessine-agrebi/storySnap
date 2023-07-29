import Story from "../models/story.model.js";

// Function to create a new story
const createStory = async (storyData) => {
  try {
    const newStory = await Story.create(storyData);
    return newStory;
  } catch (error) {
    throw new Error("Failed to create story.");
  }
};

// Function to get all stories
const getAllStories = async () => {
  try {
    const allStories = await Story.find().populate("userId", "username", "country");
    return allStories;
  } catch (error) {
    throw new Error("Failed to fetch stories.");
  }
};

// Function to get a single story by its ID
const getStoryById = async (storyId) => {
  try {
    const story = await Story.findById(storyId).populate("userId", "username");
    return story;
  } catch (error) {
    throw new Error("Story not found.");
  }
};

// Function to update a story by its ID
const updateStoryById = async (storyId, updatedData) => {
  try {
    const updatedStory = await Story.findByIdAndUpdate(
      storyId,
      updatedData,
      { new: true }
    );
    return updatedStory;
  } catch (error) {
    throw new Error("Failed to update story.");
  }
};

// Function to delete a story by its ID
const deleteStoryById = async (storyId) => {
  try {
    await Story.findByIdAndDelete(storyId);
  } catch (error) {
    throw new Error("Failed to delete story.");
  }
};

export { createStory, getAllStories, getStoryById, updateStoryById, deleteStoryById };
