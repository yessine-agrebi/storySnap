import bcrypt from 'bcryptjs'
import User from '../models/user.model.js';
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
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 10000); // Change the range as needed
  
    // Convert the first letter of the adjective and noun to uppercase
    const camelCaseAdjective = randomAdjective.charAt(0).toUpperCase() + randomAdjective.slice(1);
    const camelCaseNoun = randomNoun.charAt(0).toUpperCase() + randomNoun.slice(1);
  
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
  