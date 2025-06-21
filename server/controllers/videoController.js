const mongoose = require('mongoose');
const Video = require('../models/Video'); // Assuming you have a Video model defined in models/Video.js

// Create a new video
const createVideo = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: 'request_body_missing' });
  }

  const { title, description } = req.body;

  // Check if the user is authenticated
  if (!req.userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  // Use the authenticated user's ID as uploaderId
  const uploaderId = req.userId;

  // Check if all required fields are provided
  if (!title || !description) {
    return res.status(400).json({ error: 'missing_required_fields', fields: { title, description } });
  }

  // Create a new video
  const newVideo = new Video({
    title,
    description,
    uploaderId,
  });

  try {
    await newVideo.save();
    res.status(201).json({ success: true, message: 'Video created successfully', videoId: newVideo._id });
  } catch (error) {
    console.error('Error creating video:', error); // Log the error details
    res.status(400).json({ error: 'error_creating_video' });
  }
};

// Get video details
const getVideoDetails = async (req, res) => {
  const { videoId } = req.params;

  // Check if the videoId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    return res.status(400).json({ error: 'Invalid video ID format' });
  }

  try {
    const video = await Video.findOne({ _id: videoId });
    if (!video) {
      return res.status(404).json({ error: 'video_not_found' });
    }

    res.status(200).json({ success: true, video });
  } catch (error) {
    console.error('Error retrieving video details:', error); // Log the error details
    res.status(500).json({ error: 'error_retrieving_video' });
  }
};

// Update a video
const updateVideo = async (req, res) => {
  const { videoId } = req.params;

  // Check if the videoId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    return res.status(400).json({ error: 'Invalid video ID format' });
  }

  try {
    const updatedVideo = await Video.findOneAndUpdate(
      { _id: videoId },
      { ...req.body, updatedAt: Date.now() }, // Update fields and set updatedAt
      { new: true } // Return the updated document
    );

    if (!updatedVideo) {
      return res.status(404).json({ error: 'video_not_found' });
    }

    res.status(200).json({ success: true, message: 'Video updated successfully', video: updatedVideo });
  } catch (error) {
    console.error('Error updating video:', error); // Log the error details
    res.status(500).json({ error: 'error_updating_video' });
  }
};

// Delete a video
const deleteVideo = async (req, res) => {
  const { videoId } = req.params;

  // Check if the videoId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    return res.status(400).json({ error: 'Invalid video ID format' });
  }

  try {
    const deletedVideo = await Video.findOneAndDelete({ _id: videoId });
    if (!deletedVideo) {
      return res.status(404).json({ error: 'video_not_found' });
    }

    res.status(200).json({ success: true, message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error); // Log the error details
    res.status(500).json({ error: 'error_deleting_video' });
  }
};

// Export the controller functions
module.exports = {
  createVideo,
  getVideoDetails,
  updateVideo,
  deleteVideo,
};
