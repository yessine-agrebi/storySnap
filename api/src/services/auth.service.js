import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
const adjectives = [
  "happy",
  "brilliant",
  "adventurous",
  "curious",
  "mysterious",
  "awesome",
];
const nouns = ["unicorn", "dragon", "wizard", "moon", "star", "garden"];

const generateUsername = () => {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 10000); // Change the range as needed

  // Convert the first letter of the adjective and noun to uppercase
  const camelCaseAdjective =
    randomAdjective.charAt(0).toUpperCase() + randomAdjective.slice(1);
  const camelCaseNoun =
    randomNoun.charAt(0).toUpperCase() + randomNoun.slice(1);

  return `${camelCaseAdjective}${camelCaseNoun}${randomNumber}`;
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    // Generate a unique username for the user
    const username = generateUsername();
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "Registration successful." });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "An error occurred during registration." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found." });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign(
      { userId: user._id, role: user.role }, // Include the role in the JWT payload
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_SECRET_EXPIRATION }
    );

    res.json({ token, username: user.username, role: user.role });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "An error occurred during login." });
  }
};

// auth.service.js

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email is registered
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found." });
    }

    // Generate a unique password reset token
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Set the expiration time for the token
    });

    // Save the reset token and its expiration time to the user's record in the database
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // Send the password reset link to the user's email
    // Implement your email sending logic here

    res.json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find the user with the given reset token
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }, // Check if the token is not expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};

export const requestEmailVerification = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email is registered
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found." });
    }

    // Generate a unique email verification token
    const verificationToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d", // Set the expiration time for the token (e.g., 1 day)
      }
    );

    // Save the verification token to the user's record in the database
    user.emailVerificationToken = verificationToken;
    await user.save();

    // Send the email verification link to the user's email
    // Implement your email sending logic here

    res.json({ message: "Email verification link sent to your email." });
  } catch (error) {
    console.error("Error requesting email verification:", error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    // Find the user with the given verification token
    const user = await User.findOne({ emailVerificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    // Mark the user's email as verified in the database
    user.emailVerificationToken = undefined;
    await user.save();

    res.json({ message: "Email verified successfully." });
  } catch (error) {
    console.error("Error verifying email:", error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};
