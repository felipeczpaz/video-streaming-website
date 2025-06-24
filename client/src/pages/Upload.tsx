import React, { useState, useEffect } from "react";
import { useDarkMode } from "../context/DarkModeContext"; // Adjust the import path as necessary
import { useUser } from "../context/UserContext"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Upload: React.FC = () => {
  const { isDarkMode } = useDarkMode(); // Use the dark mode context
  const { user } = useUser(); // Access user context
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(""); // Clear any previous error
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("File uploaded successfully!");
      } else {
        setError("Failed to upload file. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during the upload. Please try again later.");
    }
  };

  // Check for token in local storage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if token is not found
    }
  }, [navigate]);

  return (
    <div className="max-w-3xl mx-auto mt-20 p-8 font-sans">
      <h1 className="text-2xl font-bold">📤 Upload Your Video</h1>
      <p className="mt-4">
        Welcome, <strong>{user?.username || "Guest"}</strong>! Please upload your video file below.
      </p>

      {error && <p className="mt-4 text-red-600">{error}</p>}
      {successMessage && <p className="mt-4 text-green-600">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="mt-6" noValidate>
        <label className="block mb-2 font-semibold" htmlFor="file-upload">
          Choose a video file
        </label>
        <input
          id="file-upload"
          type="file"
          accept="video/*" // Restrict to video file types
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleFileChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Upload
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">🌟 Upload Guidelines</h2>
        <ul className="list-disc list-inside mt-2">
          <li>📁 Supported formats: .mp4, .avi, .mov, .mkv</li> {/* Updated to reflect video formats */}
          <li>🔒 Ensure your file does not exceed 10MB.</li>
          <li>📝 Please provide accurate file information.</li>
        </ul>
      </div>

      <div className="flex justify-center mt-8">
        <img
          src={isDarkMode ? "/flowhooks-logo-white.png" : "/flowhooks-logo-dark.png"} // Change the logo based on dark mode
          alt="FlowHooks Logo"
          className="max-w-xs h-auto"
        />
      </div>
    </div>
  );
};

export default Upload;
