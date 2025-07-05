const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

// Function to generate thumbnails
const generateThumbnails = async (videoPath, count, thumbnailFolder) => {
  const thumbnailPaths = [];
  const outputDir = path.join(__dirname, '../', thumbnailFolder);

  // Ensure the thumbnail directory exists
  if (!fs.existsSync(outputDir)) {
    console.log(`Thumbnail directory does not exist. Creating: ${outputDir}`);
    fs.mkdirSync(outputDir);
    console.log(`Thumbnail directory created: ${outputDir}`);
  } else {
    console.log(`Thumbnail directory already exists: ${outputDir}`);
  }

  return new Promise((resolve, reject) => {
    console.log(`Starting thumbnail generation for video: ${videoPath}`);
    
    // Use ffmpeg to generate thumbnails
    ffmpeg(videoPath)
      .on('end', () => {
        console.log(`Thumbnail generation completed for video: ${videoPath}`);
        resolve(thumbnailPaths);
      })
      .on('error', (err) => {
        console.error(`Error occurred during thumbnail generation: ${err.message}`);
        reject(err);
      })
      .on('filenames', (filenames) => {
        // Capture the generated thumbnail filenames
        filenames.forEach((filename) => {
          // Maintain the 'thumbnails/' prefix with the filename
          const thumbnailPath = `thumbnails/${filename}`;
          thumbnailPaths.push(thumbnailPath);
        });
        console.log(`Generated thumbnails: ${thumbnailPaths.join(', ')}`);
      })
      .screenshots({
        count: count,
        folder: outputDir,
        filename: 'thumbnail-%b.png', // Customize filename as needed
      });

    console.log(`Generating ${count} thumbnails in folder: ${outputDir}`);
  });
};

module.exports = { generateThumbnails };
