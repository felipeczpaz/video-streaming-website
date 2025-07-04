const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const User = require('../models/User'); // Assuming you have a User model defined in models/User.js
const storeToken = require('../services/tokenService'); // Import token service

const JWT_SECRET = process.env.JWT_SECRET; // Replace with your actual secret key
if (!JWT_SECRET) {
  console.error('JWT_SECRET is not defined. Please set it in your environment variables.');
  process.exit(1); // Exit the process if the secret is not set
}

// User registration function
const registerUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: 'request_body_missing' });
  }

  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'user_already_exists' });
  }

  // Hash the password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    username,
    email,
    passwordHash,
  });

  try {
    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

    // Store the token in the database
    await storeToken(newUser._id, token);

    res.status(201).json({ success: true, message: 'User registered successfully', userId: newUser._id, username: newUser.username, token });
  } catch (error) {
    console.error('Error registering user:', error); // Log the error details
    res.status(400).json({ error: 'error_registering_user' });
  }
};

// User login function
const loginUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: 'request_body_missing' });
  }

  const { login, password } = req.body; // Changed to 'identifier' to accept both username and email

  try {
    // Find user by username or email
    const user = await User.findOne({
      $or: [
        { email: login },
        { username: login }
      ]
    });

    if (!user) {
      return res.status(401).json({ error: 'invalid_credentials' });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'invalid_credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Store the token in the database
    await storeToken(user._id, token);

    // Successful login
    res.status(200).json({ success: true, message: 'Login successful', userId: user._id, username: user.username, token });
  } catch (error) {
    console.error('Error logging in user:', error); // Log the error details
    res.status(500).json({ error: 'error_logging_in' });
  }
};

// Get user details function
const getUserDetails = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  // Use the authenticated user's ID if "me" is requested
  const userId = req.params.userId === 'me' ? req.userId : req.params.userId;

  // Check if the userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid user ID format' });
  }

  try {
    console.log('Fetching details for user ID:', userId); // Log the user ID being fetched

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: 'user_not_found' });
    }

    // Exclude password from the response
    const { passwordHash, ...userDetails } = user.toObject();
    res.status(200).json({ success: true, userDetails });
  } catch (error) {
    console.error('Error retrieving user details:', error); // Log the error details
    res.status(500).json({ error: 'error_retrieving_user' });
  }
};

// Export the controller functions
module.exports = {
  registerUser,
  loginUser,
  getUserDetails,
};
