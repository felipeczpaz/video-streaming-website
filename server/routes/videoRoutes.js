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
const router = express.Router();
const videoController = require('../controllers/videoController');
const authenticate = require('../middleware/authenticate');

// Create a new video route
router.post('/create', authenticate, videoController.createVideo);

// Get video details route
router.get('/:videoId', videoController.getVideoDetails);

// Update a video route
router.put('/:videoId', authenticate, videoController.updateVideo);

// Delete a video route
router.delete('/:videoId', authenticate, videoController.deleteVideo);

module.exports = router;
