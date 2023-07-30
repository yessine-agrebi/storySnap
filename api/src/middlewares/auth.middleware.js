// auth.middleware.js

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from the Authorization header

    if (!token) {
      // Token not found, user is not authenticated
      return next();
    }

    // Verify the JWT token and extract user data
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user based on the user ID in the token
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      // User not found, token is invalid
      return next();
    }

    // Set req.user with user information, including the role
    req.user = { userId: user._id.toString(), role: user.role };

    next();
  } catch (error) {
    // Error while verifying token, token is invalid
    next();
  }
};
