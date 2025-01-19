import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const FacultyPage = () => {
  const [numQuestions, setNumQuestions] = useState(1);
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(`/add-questions?num=${numQuestions}`);
  };

  // Route to view the question list
  const handleViewQuestions = () => {
    navigate("/view-questions"); 
  };

  return (
    <div className="text-center mt-7">
      <h1 className="text-4xl font-bold mb-8">Welcome Teacher</h1>
      <div className="space-y-4">
        <label className="block text-xl font-semibold">Number of Questions</label>
        <input
          type="number"
          min="1"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          className="w-80 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
        <br />
        <button
          onClick={handleStart}
          className="w-80 px-5 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Start Adding Questions
        </button>
        <br />
        <button
          onClick={handleViewQuestions}
          className="w-80 px-5 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          View Current Questions
        </button>
      </div>
    </div>
  );
};

export default FacultyPage;
