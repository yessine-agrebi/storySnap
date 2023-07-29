import mongoose from "mongoose";

// Create a new Mongoose schema for the Story model
const storySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280, // Adjust the maximum length as needed
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referencing the User model
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    votes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Referencing the User model
      },
    ],
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Referencing the User model
          required: true,
        },
        content: {
          type: String,
          required: true,
          trim: true,
          maxlength: 280,
        },
      },
    ],
  },
  { timestamps: true }
);

// Create the Story model using the storySchema
const Story = mongoose.model("Story", storySchema);

export default Story;
