const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Define the Video schema
const videoSchema = new mongoose.Schema({
    uploaderId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        required: true,
        ref: 'User' // Assuming the User model is named 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnailUrl: { // Changed to an array of strings for thumbnail URLs
        type: [String], // Array of strings
        required: true // You can set this to false if the thumbnail is optional
    },
    videoUrl: { // New field for video URL
        type: String,
        required: true // You can set this to false if the video URL is optional
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets the date when the video is created
    },
    updatedAt: {
        type: Date,
        default: Date.now // Automatically sets the date when the video is updated
    },
});

// Apply the AutoIncrement plugin to the video schema
videoSchema.plugin(AutoIncrement, { inc_field: 'videoId' });

// Middleware to update the updatedAt field before saving
videoSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create the Video model
const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
