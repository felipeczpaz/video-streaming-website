import React, { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext"; // Adjust the import path as necessary
import { useUser } from "../context/UserContext"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import UploadComponent from "../components/Upload/Upload.tsx"; // Import the new UploadComponent

const UploadPage: React.FC = () => {
  const { user } = useUser(); // Access user context
  const navigate = useNavigate(); // Initialize navigate for redirection
  const [token, setToken] = useState<string | null>(null); // State to store the token

  // Check for token in local storage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); // Store the token if found
    } else {
      navigate("/login"); // Redirect to login if token is not found
    }
  }, [navigate]);

  // Return nothing if there is no token
  if (!token) {
    return null; // Render nothing if no token is found
  }

  return (
    <div className="max-w-3xl mx-auto mt-20 p-8 font-sans">
      <h1 className="text-2xl font-bold">📤 Upload Your Video</h1>
      <p className="mt-4">
        Welcome, <strong>{user?.username || "Guest"}</strong>! Please upload
        your video file below.
      </p>
      <UploadComponent /> {/* Render the UploadComponent */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">🌟 Upload Guidelines</h2>
        <ul className="list-disc list-inside mt-2">
          <li>📁 Supported formats: .mp4, .avi, .mov, .mkv</li>
          <li>🔒 Ensure your file does not exceed 10MB.</li>
          <li>📝 Please provide accurate file information.</li>
        </ul>
      </div>
    </div>
  );
};

export default UploadPage;
