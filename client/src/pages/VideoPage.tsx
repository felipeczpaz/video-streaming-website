import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';

const VideoPage: React.FC = () => {
    const { videoId } = useParams<{ videoId: string }>();
    const [video, setVideo] = useState<any>(null); // State to hold video metadata
    const [videoUrl, setVideoUrl] = useState<string | null>(null); // State to hold video URL
    const [loading, setLoading] = useState<boolean>(true); // State to manage loading state
    const [error, setError] = useState<string | null>(null); // State to manage error messages

    useEffect(() => {
        const fetchVideoData = async () => {
            setLoading(true); // Start loading
            setError(null); // Reset error state

            try {
                // Fetch video metadata
                const response = await fetch(`http://localhost:3000/api/videos/${videoId}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`, // Replace with your actual token
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch video metadata');
                }

                const data = await response.json();
                setVideo(data.video); // Set the video metadata

                // Now fetch the video stream
                /*const streamResponse = await fetch(`http://localhost:3000/api/videos/${videoId}/stream`, {
                    method: 'POST', // Use POST for streaming video
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`, // Replace with your actual token
                    },
                });

                if (!streamResponse.ok) {
                    throw new Error('Failed to fetch video stream');
                }

                const videoBlob = await streamResponse.blob(); // Get the response as a Blob
                const url = URL.createObjectURL(videoBlob); // Create a URL for the Blob
                setVideoUrl(url); // Set the video URL for the player*/

            } catch (err) {
                setError(err.message); // Set error message if fetch fails
            } finally {
                setLoading(false); // Set loading to false after fetch is complete
            }
        };

        fetchVideoData();
    }, [videoId]); // Dependency array includes videoId to refetch if it changes

    if (loading) {
        return <div className="mt-8 pt-8">Loading...</div>; // Show loading state
    }

    if (error) {
        return <div className="mt-8 pt-8">Error: {error}</div>; // Show error message if fetch fails
    }

    if (!video) {
        return <div className="mt-8 pt-8">No video found</div>; // Handle case where no video data is returned
    }

    return (
        <div>
            {video ? (
                <VideoPlayer 
                    videoUrl={videoUrl} 
                    title={video.title} 
                    description={video.description} 
                />
            ) : (
                <div>Loading video...</div> // Show loading state for video
            )}
        </div>
    );
};

export default VideoPage;
