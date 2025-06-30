import React, { forwardRef } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  description: string;
  onTimeUpdate: () => void; // Add onTimeUpdate prop
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ videoUrl, title, description, onTimeUpdate }, ref) => {
    return (
      <div className="mt-10 pt-10 max-w-4xl mx-auto items-start">
        <div className="flex-1 mr-4">
          <video
            controls
            className="w-full rounded-lg"
            ref={ref} // Attach the ref to the video element
            onTimeUpdate={onTimeUpdate} // Attach the time update handler
          >
            {videoUrl ? (
              <source src={videoUrl} type="video/mp4" />
            ) : (
              <p>No video available</p> // Optional message if no video URL is provided
            )}
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex-1">
          <h1 className="mt-4 text-2xl font-bold mb-2">{title}</h1>
          <p className="text-base leading-relaxed text-gray-600">
            {description}
          </p>
        </div>
      </div>
    );
  },
);

export default VideoPlayer;
