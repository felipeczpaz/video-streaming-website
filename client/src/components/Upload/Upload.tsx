import React, { useState } from "react";
import axios from "axios";
import { useDarkMode } from "../../context/DarkModeContext"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const UploadComponent: React.FC = () => {
  const { isDarkMode } = useDarkMode(); // Use the dark mode context
  const [file, setFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>(""); // State for video title
  const [videoDescription, setVideoDescription] = useState<string>(""); // State for video description
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0); // State for upload progress
  const [isUploading, setIsUploading] = useState<boolean>(false); // State for upload indicator
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
    setUploadProgress(0); // Reset progress
    setIsUploading(true); // Start the upload process

    if (!file) {
      setError("Please select a file to upload.");
      setIsUploading(false); // Stop the upload process
      return;
    }

    const formData = new FormData();
    formData.append("title", videoTitle);
    formData.append("description", videoDescription);
    formData.append("videoFile", file); // Ensure this matches the field name in multer

    try {
      const response = await axios.post("http://localhost:3000/api/videos/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your actual token
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentComplete = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(percentComplete); // Update progress state
        },
      });

      setSuccessMessage("File uploaded successfully!");
      setVideoTitle(""); // Clear title after successful upload
      setVideoDescription(""); // Clear description after successful upload
      setFile(null); // Clear file after successful upload
      navigate(`/video/${response.data.videoId}`); // Redirect to the uploaded video page
    } catch (error) {
      setError("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false); // Stop the upload process
    }
  };

  // Common styles for inputs
  const inputStyles = `w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
    isDarkMode
      ? "bg-gray-600 border-gray-400 text-white focus:ring-blue-500"
      : "bg-white text-black border-gray-300 focus:ring-blue-500"
  }`;

  return (
    <div>
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {successMessage && (
        <p className="mt-4 text-green-600">{successMessage}</p>
      )}
      {isUploading && (
        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="mt-1 text-sm text-blue-600">{uploadProgress}%</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6" noValidate>
        <label className="block mb-2 font-semibold" htmlFor="video-title">
          Video Title
        </label>
        <input
          id="video-title"
          type="text"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
          className={inputStyles}
          required
        />

        <label className="block mb-2 font-semibold" htmlFor="video-description">
          Video Description
        </label>
        <textarea
          id="video-description"
          value={videoDescription}
          onChange={(e) => setVideoDescription(e.target.value)}
          className={inputStyles}
          rows={4}
          required
        />

        <label className="block mb-2 font-semibold" htmlFor="file-upload">
          Choose a video file
        </label>
        <input
          id="file-upload"
          type="file"
          accept="video/*" // Restrict to video file types
          className={inputStyles}
          onChange={handleFileChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-colors"
          disabled={isUploading} // Disable button while uploading
        >
          {isUploading ? "Uploading..." : "Upload"} {/* Change button text based on upload state */}
        </button>
      </form>
    </div>
  );
};

export default UploadComponent;
