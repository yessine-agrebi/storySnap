import supertest from "supertest";
import Story from "../src/models/story.model.js";
import app from "../src/server.js";
import mongoose from "mongoose";

const request = supertest(app);

describe("Story Endpoints", () => {
  let storyId;

  beforeAll(async () => {
    // Insert a sample story for testing
    const newStory = new Story({
      content: "This is a test story.",
      userId: new mongoose.Types.ObjectId(),
    });
    const savedStory = await newStory.save();
    storyId = savedStory._id;
  });

  afterAll(async () => {
    // Clean up the database after testing
    await Story.deleteMany();
  });

  it("should leave a comment on the story", async () => {
    const userId = new mongoose.Types.ObjectId();
    const response = await request
      .post(`/api/stories/${storyId}/comment`)
      .send({ userId: userId.toString(), content: "This is a test comment." });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Comment added successfully.");
    expect(response.body.comment).toHaveProperty("_id");
    expect(response.body.comment.userId).toBe(userId.toString());
    expect(response.body.comment.content).toBe("This is a test comment.");
  });

  // Add more tests for other endpoints...
});
