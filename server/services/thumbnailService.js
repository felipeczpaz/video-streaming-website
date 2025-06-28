const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

// Function to generate thumbnails
const generateThumbnails = async (videoPath, count, thumbnailFolder) => {
  const thumbnailPaths = [];
  const outputDir = path.join(__dirname, '../', thumbnailFolder);

  // Ensure the thumbnail directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  return new Promise((resolve, reject) => {
    // Use ffmpeg to generate thumbnails
    ffmpeg(videoPath)
      .on('end', () => {
        resolve(thumbnailPaths);
      })
      .on('error', (err) => {
        reject(err);
      })
      .screenshots({
        count: count,
        folder: outputDir,
        filename: 'thumbnail-%b.png', // Customize filename as needed
      });
  });
};

module.exports = { generateThumbnails };
