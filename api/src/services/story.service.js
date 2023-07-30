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
const getAllStories = async (page = 1, limit = 10, sortQuery, userCountryFilter) => {
  try {
    const skip = (page - 1) * limit;
    let query = Story.find();

    if (userCountryFilter) {
      query = query.populate({
        path: 'userId',
        select: 'username country',
        match: { country: userCountryFilter }
      });
    } else {
      query = query.populate('userId', 'username country');
    }

    if (sortQuery) {
      query = query.sort(sortQuery);
    }

    const totalStories = await Story.countDocuments();
    const allStories = await query
      .skip(skip)
      .limit(limit)
      .exec();

    // Filter out users whose country does not match the filter
    const filteredStories = allStories.filter(story => story.userId);

    return { totalStories, stories: filteredStories };
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
    const updatedStory = await Story.findByIdAndUpdate(storyId, updatedData, {
      new: true,
    });
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

export {
  createStory,
  getAllStories,
  getStoryById,
  updateStoryById,
  deleteStoryById,
};
