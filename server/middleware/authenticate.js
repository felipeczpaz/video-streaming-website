// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization']; // Use lowercase 'authorization' for case insensitivity

  // Check if the authorization header is present and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  // Extract the Bearer token
  const token = authHeader.split(' ')[1]; // Bearer token
  if (!token || token.trim() === '') {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret
    req.userId = decoded.userId; // Assuming the token contains the user ID
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
};

module.exports = authenticate;
