import supertest from "supertest";
import app from "../src/server.js";
import mongoose from "mongoose";

const request = supertest(app);

describe("leaveCommentOnStoryController", () => {
  it("should leave a comment on the story", async () => {
    // Insert a sample story for testing
    const newStory = {
      content: "This is a test story.",
      userId: new mongoose.Types.ObjectId(),
    };
    const insertedStory = await request.post("/api/stories").send(newStory);

    const response = await request
      .post(`/api/stories/${insertedStory.body._id}/comment`)
      .send({
        userId: new mongoose.Types.ObjectId(),
        content: "This is a test comment.",
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Comment added successfully.");
    expect(response.body.comment).toHaveProperty("_id");
    expect(response.body.comment.userId).toBeString(); // Assuming userId is a string
    expect(response.body.comment.content).toBe("This is a test comment.");
  });
});
