import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";

const VideoPage: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [video, setVideo] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null); // Reference to the video element

  useEffect(() => {
    const fetchVideoData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:3000/api/videos/${videoId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch video metadata");
        }

        const data = await response.json();
        setVideo(data.video);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
    handlePlayVideo(0, 32 * 1024 * 1024 - 1); // Fetch the first 32 MB
  }, [videoId]);

  const handlePlayVideo = async (start: number, end: number) => {
    try {
      const streamResponse = await fetch(
        `http://localhost:3000/api/videos/${videoId}/stream`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Range: `bytes=${start}-${end}`,
          },
        },
      );

      if (!streamResponse.ok) {
        throw new Error("Failed to fetch video stream");
      }

      const videoBlob = await streamResponse.blob();
      const url = URL.createObjectURL(videoBlob);
      setVideoUrl(url);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVideoTimeUpdate = async () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;

      console.log(`Current time: ${currentTime} seconds`);
      console.log(`Duration: ${duration} seconds`);
    }
  };

  if (loading) {
    return <div className="mt-8 pt-8">Loading...</div>;
  }

  if (error) {
    return <div className="mt-8 pt-8">Error: {error}</div>;
  }

  if (!video) {
    return <div className="mt-8 pt-8">No video found</div>;
  }

  return (
    <div>
      {video && (
        <VideoPlayer
          videoUrl={videoUrl}
          title={video.title}
          description={video.description}
          onTimeUpdate={handleVideoTimeUpdate} // Pass the time update handler
          ref={videoRef} // Attach the ref to the video player
        />
      )}
    </div>
  );
};

export default VideoPage;
