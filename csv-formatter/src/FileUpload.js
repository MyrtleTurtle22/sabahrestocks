import React, { useState } from "react";
import axios from "axios";
import { FaFileCsv, FaCloudUploadAlt, FaDownload } from "react-icons/fa";

const FileUpload = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file1 || !file2) {
      alert("Please select both files.");
      return;
    }

    setLoading(true);
    setDownloadUrl(null);

    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);

    try {
      const response = await axios.post("https://sabahrestocks.onrender.com", formData, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(url);
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to process files.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Restock Formatter</h1>

        <label className="flex items-center justify-center w-full p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100">
          <FaFileCsv className="text-2xl text-gray-500 mr-2" />
          <span className="text-gray-600">{file1 ? file1.name : "Upload Warehouse Inventory"}</span>
          <input type="file" accept=".csv" className="hidden" onChange={(e) => handleFileChange(e, setFile1)} />
        </label>

        <label className="flex items-center justify-center w-full p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 mt-3">
          <FaFileCsv className="text-2xl text-gray-500 mr-2" />
          <span className="text-gray-600">{file2 ? file2.name : "Upload Store Inventory/Sales"}</span>
          <input type="file" accept=".csv" className="hidden" onChange={(e) => handleFileChange(e, setFile2)} />
        </label>

        <button
          onClick={handleUpload}
          disabled={loading}
          className={`mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <FaCloudUploadAlt className="text-lg" />
          {loading ? "Processing..." : "Upload & Format"}
        </button>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download="formatted_output.xlsx"
            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white"
          >
            <FaDownload className="text-lg" />
            Download Formatted File
          </a>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
