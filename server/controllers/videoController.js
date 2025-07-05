const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { generateThumbnails } = require('../services/thumbnailService');
const Video = require("../models/Video"); // Assuming you have a Video model defined in models/Video.js

// Stream video
const streamVideo = async (req, res) => {
  const { videoId } = req.params;

  // Validate videoId
  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    return res.status(400).json({ error: "Invalid video ID format" });
  }

  try {
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ error: "video_not_found" });
    }

    const videoPath = path.join(__dirname, "../", video.videoUrl);
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize || end >= fileSize) {
        return res.status(416).send("Requested range not satisfiable");
      }

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": end - start + 1,
        "Content-Type": "video/mp4",
      });

      const stream = fs.createReadStream(videoPath, { start, end });
      stream.pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      });

      const stream = fs.createReadStream(videoPath);
      stream.pipe(res);
    }
  } catch (error) {
    console.error("Error streaming video:", error);
    res.status(500).json({ error: "error_streaming_video" });
  }
};

// Create a new video
const createVideo = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "request_body_missing" });
  }

  const { title, description } = req.body;

  // Check if the user is authenticated
  if (!req.userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  // Use the authenticated user's ID as uploaderId
  const uploaderId = req.userId;

  // Check if all required fields are provided
  if (!title || !description || !req.file) {
    return res.status(400).json({
      error: "missing_required_fields",
      fields: { title, description },
    });
  }

  // Define paths for the video and thumbnails
  const videoPath = req.file.path;
  const thumbnailFolder = 'thumbnails';

  try {
    // Generate thumbnails
    const thumbnailPaths = await generateThumbnails(videoPath, 1, thumbnailFolder);
console.log(thumbnailPaths);

    // Create a new video with the generated thumbnail URLs
    const newVideo = new Video({
      title,
      description,
      thumbnailUrl: thumbnailPaths, // Store an array of thumbnail paths
      videoUrl: videoPath,
      uploaderId,
    });

    await newVideo.save();
    res.status(201).json({
      success: true,
      message: "Video created successfully",
      videoId: newVideo._id,
    });
  } catch (error) {
    console.error("Error creating video:", error);
    res.status(500).json({ error: "error_creating_video" });
  }
};

// Get video details
const getVideoDetails = async (req, res) => {
  const { videoId } = req.params;

  // Check if the videoId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    return res.status(400).json({ error: "Invalid video ID format" });
  }

  try {
    const video = await Video.findOne({ _id: videoId });
    if (!video) {
      return res.status(404).json({ error: "video_not_found" });
    }

    res.status(200).json({ success: true, video });
  } catch (error) {
    console.error("Error retrieving video details:", error); // Log the error details
    res.status(500).json({ error: "error_retrieving_video" });
  }
};

// Update a video
const updateVideo = async (req, res) => {
  const { videoId } = req.params;

  // Check if the videoId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    return res.status(400).json({ error: "Invalid video ID format" });
  }

  try {
    const updatedVideo = await Video.findOneAndUpdate(
      { _id: videoId },
      { ...req.body, updatedAt: Date.now() }, // Update fields and set updatedAt
      { new: true }, // Return the updated document
    );

    if (!updatedVideo) {
      return res.status(404).json({ error: "video_not_found" });
    }

    res.status(200).json({
      success: true,
      message: "Video updated successfully",
      video: updatedVideo,
    });
  } catch (error) {
    console.error("Error updating video:", error); // Log the error details
    res.status(500).json({ error: "error_updating_video" });
  }
};

// Delete a video
const deleteVideo = async (req, res) => {
  const { videoId } = req.params;

  // Check if the videoId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    return res.status(400).json({ error: "Invalid video ID format" });
  }

  try {
    const deletedVideo = await Video.findOneAndDelete({ _id: videoId });
    if (!deletedVideo) {
      return res.status(404).json({ error: "video_not_found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error); // Log the error details
    res.status(500).json({ error: "error_deleting_video" });
  }
};

// Get video feed
const getVideoFeed = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 }); // Fetch all videos sorted by creation date
    res.status(200).json({ success: true, videos });
  } catch (error) {
    console.error("Error fetching video feed:", error); // Log the error details
    res.status(500).json({ error: "error_fetching_video_feed" });
  }
};

// Get video thumbnail
const getVideoThumbnail = async (req, res) => {
  const { videoId } = req.params;

  // Check if the videoId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    return res.status(400).json({ error: "Invalid video ID format" });
  }

  try {
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ error: "video_not_found" });
    }

    // Assuming thumbnailUrl is stored as an array, get the first thumbnail
    const thumbnailUrl = video.thumbnailUrl[0]; // Adjust this if you want a different thumbnail

    // Define the path to the thumbnail
    const thumbnailPath = path.join(__dirname, "../", thumbnailUrl);

    // Check if the thumbnail exists
    if (!fs.existsSync(thumbnailPath)) {
      return res.status(404).json({ error: "thumbnail_not_found" });
    }

    // Serve the thumbnail image
    res.sendFile(thumbnailPath, { headers: { 'Content-Type': 'image/png' } }, (err) => {
      if (err) {
        console.error("Error sending thumbnail:", err);
        res.status(err.status).end();
      }
    });
  } catch (error) {
    console.error("Error retrieving video thumbnail:", error);
    res.status(500).json({ error: "error_retrieving_thumbnail" });
  }
};

// Export the controller functions
module.exports = {
  streamVideo,
  createVideo,
  getVideoDetails,
  updateVideo,
  deleteVideo,
  getVideoFeed,
  getVideoThumbnail, // Add the new function to the exports
};
