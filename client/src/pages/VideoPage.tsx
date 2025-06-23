import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';

const VideoPage: React.FC = () => {
    const { videoId } = useParams<{ videoId: string }>();
    const [video, setVideo] = useState<any>(null); // State to hold video data
    const [loading, setLoading] = useState<boolean>(true); // State to manage loading state
    const [error, setError] = useState<string | null>(null); // State to manage error messages

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/videos/${videoId}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`, // Replace with your actual token
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch video data');
                }

                const data = await response.json();
                setVideo(data.video); // Set the video data from the response
            } catch (err) {
                setError(err.message); // Set error message if fetch fails
            } finally {
                setLoading(false); // Set loading to false after fetch is complete
            }
        };

        fetchVideoData();
    }, [videoId]); // Dependency array includes videoId to refetch if it changes

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error message if fetch fails
    }

    if (!video) {
        return <div>No video found</div>; // Handle case where no video data is returned
    }

    return (
        <div>
            <VideoPlayer 
                videoUrl={video.videoUrl} 
                title={video.title} 
                description={video.description} 
            />
        </div>
    );
};

export default VideoPage;
