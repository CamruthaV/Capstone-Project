import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const AdminPage = () => {
  const [subjectCode, setSubjectCode] = useState("");
  const [coLevel, setCoLevel] = useState(1);
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const navigate = useNavigate();

  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/questions/generate", {
        subjectCode,
        coLevel,
        difficultyLevel,
      });
      const questions = response.data;
      navigate("/generated-questions", { state: { questions } });
    } catch (error) {
      console.error("Error generating question paper:", error);
    }
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold mb-8">Welcome Admin</h1>
      <form onSubmit={handleGenerate} className="space-y-6">
        {/* Subject Code Input */}
        <div>
          <label className="block text-xl font-semibold mb-2">
            Subject Code
          </label>
          <input
            type="text"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            required
            className="w-80 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
        </div>

        {/* CO Level Dropdown */}
        <div>
          <label className="block text-xl font-semibold mb-2">CO Level</label>
          <select
            value={coLevel}
            onChange={(e) => setCoLevel(e.target.value)}
            className="w-80 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg bg-white"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>

        {/* Difficulty Level Dropdown */}
        <div>
          <label className="block text-xl font-semibold mb-2">
            Difficulty Level
          </label>
          <select
            value={difficultyLevel}
            onChange={(e) => setDifficultyLevel(e.target.value)}
            className="w-80 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg bg-white"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-5 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Generate Question Paper
        </button>
      </form>
    </div>
  );
};

export default AdminPage;