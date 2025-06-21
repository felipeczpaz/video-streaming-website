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
