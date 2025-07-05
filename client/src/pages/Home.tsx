import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from '../components/Spinner/Spinner'; // Import the Spinner component

const Home: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/videos/feed"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setVideos(data.videos); // Adjust based on the actual structure of your API response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-6 mt-20">
        <Spinner /> {/* Use the Spinner component */}
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-6 mt-20">Error: {error}</div>;
  }

  return (
    <div className="text-center p-6 mt-20">
      <h1 className="text-3xl font-bold mb-6">Video Streaming Homepage</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <Link
            key={video._id} // Use _id as the key
            to={`/video/${video._id}`} // Link to the video page
            className="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
          >
            <img
              src={`http://localhost:3000/api/videos/${video._id}/thumbnail`} // Construct the thumbnail URL
              alt={video.title}
              className="w-full h-auto"
            />
            <h2 className="text-lg font-semibold text-left p-4">
              {video.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
