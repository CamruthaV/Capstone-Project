// filepath: frontend/src/components/UseHistory.js
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom"; // Correct import

const UseHistory = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("/history");
        setHistory(response.data); // Assuming the API returns an array of history items
      } catch (err) {
        console.error("Error fetching history:", err);
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching the history."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleNavigate = (route) => {
    navigate(route); // Use navigate for redirection
  };

  if (loading) {
    return <div className="text-center mt-8">Loading history...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="text-center mt-7">
      <h1 className="text-4xl font-bold mb-8">Use History</h1>
      {history.length === 0 ? (
        <p className="text-lg text-gray-500">No history available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 mx-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
                <th className="border border-gray-300 px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(item.date).toLocaleDateString()} {/* Format date */}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.action}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => handleNavigate("/home")} // Example navigation
      >
        Back to Home
      </button>
    </div>
  );
};

export default UseHistory;
