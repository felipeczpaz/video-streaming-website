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

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db'); // Import the MongoDB connection function
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Use user routes
app.use('/api/user', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
