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
*  File: videoRoutes.js                                    *
*  Description:                                            *
*  Routes for video management                              *
************************************************************
*/

const express = require('express');
const multer = require('multer');
const router = express.Router();
const videoController = require('../controllers/videoController');
const authenticate = require('../middleware/authenticate');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Append timestamp to the filename
  },
});

const upload = multer({ storage, limits: { fileSize: 1 * 1024 * 1024 * 1024 }});

// Create a new video route
router.post('/create', authenticate, videoController.createVideo);

// Route for uploading a video
router.post('/upload', authenticate, upload.single('videoFile'), videoController.createVideo);

// Get video details route
router.post('/:videoId', videoController.getVideoDetails);

router.post("/:videoId/stream", videoController.streamVideo);

// Update a video route
router.put('/:videoId', authenticate, videoController.updateVideo);

// Delete a video route
router.delete('/:videoId', authenticate, videoController.deleteVideo);

// Fetch video feed route
router.get('/feed', videoController.getVideoFeed);

router.get('/:videoId/thumbnail', videoController.getVideoThumbnail);

module.exports = router;
