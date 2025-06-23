import React from 'react';

interface VideoPlayerProps {
    videoUrl: string;
    title: string;
    description: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title, description }) => {
    return (
        <div className="mt-10 pt-10 max-w-4xl mx-auto items-start">
            <div className="flex-1 mr-4">
                <video controls className="w-full rounded-lg">
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="flex-1">
                <h1 className="mt-4 text-2xl font-bold mb-2">{title}</h1>
                <p className="text-base leading-relaxed">{description}</p>
            </div>
        </div>
    );
};

export default VideoPlayer;
