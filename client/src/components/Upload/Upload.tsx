import React, { useState } from "react";

interface UploadComponentProps {
  onUpload: (file: File) => void; // Function to handle file upload
}

const UploadComponent: React.FC<UploadComponentProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validVideoTypes = ["video/mp4", "video/x-m4v", "video/ogg", "video/webm"];
      if (!validVideoTypes.includes(selectedFile.type)) {
        setError("Please select a valid video file (MP4, M4V, OGG, WEBM).");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!file || !title || !description || !thumbnailUrl) {
      setError("Please fill in all fields and select a file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("videoFile", file); // Use the correct field name for the video file
      formData.append("title", title);
      formData.append("description", description);
      formData.append("thumbnailUrl", thumbnailUrl); // Assuming thumbnailUrl is a string

      const response = await fetch("http://localhost:3000/api/videos/upload", { // Update the URL to match your backend route
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("File uploaded successfully!");
        onUpload(data.videoId); // Call the onUpload prop with the uploaded video ID
      } else {
        setError("Failed to upload file. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during the upload. Please try again later.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Video</h2>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      {successMessage && <p className="mb-4 text-green-600">{successMessage}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <label className="block mb-2 font-semibold" htmlFor="file-upload">
          Choose a video file
        </label>
        <input
          id="file-upload"
          type="file"
          accept="video/mp4,video/x-m4v,video/ogg,video/webm"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleFileChange}
          required
        />

        <label className="block mb-2 font-semibold" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="block mb-2 font-semibold" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="block mb-2 font-semibold" htmlFor="thumbnailUrl">
          Thumbnail URL
        </label>
        <input
          id="thumbnailUrl"
          type="text"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadComponent;
