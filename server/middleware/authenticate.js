// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

const authenticate = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret
    req.userId = decoded.userId; // Assuming the token contains the user ID
    next();
  } catch (error) {
    return res.status(401).json({ error: 'invalid_token' });
  }
};

module.exports = authenticate;
