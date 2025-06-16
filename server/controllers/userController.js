/*
************************************************************
*                                                          *
*   Flowhooks Software - Open Source License               *
*                                                          *
*  This software is licensed under the GNU Affero General   *
*  Public License v3. You may use, modify, and distribute   *
*  this code under the terms of the AGPLv3.                *
*                                                          *
*  This program is distributed in the hope that it will be  *
*  useful, but WITHOUT ANY WARRANTY; without even the       *
*  implied warranty of MERCHANTABILITY or FITNESS FOR A     *
*  PARTICULAR PURPOSE. See the GNU AGPLv3 for more details. *
*                                                          *
*  Author: Felipe Cezar Paz (git@felipecezar.com)          *
*  File:                                                   *
*  Description:                                            *
*                                                          *
************************************************************
*/

const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming you have a User model defined in models/User.js

// User registration function
const registerUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ success: false, error: 'Request body is missing' });
  }

  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, error: 'User already exists' });
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
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Error registering user', details: error });
  }
};

// User login function
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    // Successful login
    res.status(200).json({ success: true, message: 'Login successful', userId: user.userId, username: user.username });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error logging in', details: error });
  }
};

// Get user details function
const getUserDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Exclude password from the response
    const { passwordHash, ...userDetails } = user.toObject();
    res.status(200).json({ success: true, userDetails });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error retrieving user', details: error });
  }
};

// Export the controller functions
module.exports = {
  registerUser,
  loginUser,
  getUserDetails,
};
