// filepath: frontend/src/components/QuestionForm.js
import React, { useState } from "react";
import axios from "../api/axios";
import { useSearchParams } from "react-router-dom";

const QuestionForm = () => {
  const [searchParams] = useSearchParams();
  const numQuestions = parseInt(searchParams.get("num"), 10) || 1;
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(
    Array.from({ length: numQuestions }, () => ({
      subjectCode: "",
      coLevel: "",
      difficultyLevel: "",
      marks: "",
      questionText: "",
    }))
  );

  const handleChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const validateQuestions = () => {
    for (const q of questions) {
      if (
        !q.subjectCode ||
        !q.coLevel ||
        !q.difficultyLevel ||
        !q.marks ||
        !q.questionText
      ) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateQuestions()) {
      alert("Please fill out all fields before submitting.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/questions/batch", { questions });
      if (response.status === 201) {
        alert("Questions submitted successfully!");
        setQuestions(
          Array.from({ length: numQuestions }, () => ({
            subjectCode: "",
            coLevel: "",
            difficultyLevel: "",
            marks: "",
            questionText: "",
          }))
        );
      }
    } catch (error) {
      console.error("Error submitting questions:", error);
      alert(
        error.response?.data?.message ||
          "An error occurred while submitting the questions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center mt-7">
      <h1 className="text-4xl font-bold mb-8">Add Questions</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {questions.map((q, index) => (
          <div key={index} className="border-b-2 border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold mb-4">
              Question {index + 1}
            </h2>

            {/* First Row: Subject Code and CO Level */}
            <div className="flex justify-center space-x-4 mb-4">
              <input
                type="text"
                placeholder="Subject Code"
                value={q.subjectCode}
                onChange={(e) =>
                  handleChange(index, "subjectCode", e.target.value)
                }
                className="w-80 p-2 border-2 border-gray-300 rounded-lg"
                required
              />
              <select
                value={q.coLevel}
                onChange={(e) => handleChange(index, "coLevel", e.target.value)}
                className="w-80 p-2 border-2 border-gray-300 rounded-lg"
                placeholder="Select CO Level"
              >
                <option value="" disabled>
                  Select CO Level
                </option>
                <option value={1}>Level 1</option>
                <option value={2}>Level 2</option>
                <option value={3}>Level 3</option>
              </select>
            </div>

            {/* Second Row: Difficulty and Marks */}
            <div className="flex justify-center space-x-4 mb-4">
              <select
                value={q.difficultyLevel}
                onChange={(e) =>
                  handleChange(index, "difficultyLevel", e.target.value)
                }
                className="w-80 p-2 border-2 border-gray-300 rounded-lg"
                placeholder="Select Difficulty"
              >
                <option value="" disabled>
                  Select Difficulty
                </option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
              <input
                type="number"
                placeholder="Marks"
                value={q.marks}
                onChange={(e) => handleChange(index, "marks", e.target.value)}
                className="w-80 p-2 border-2 border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Textarea for Question */}
            <textarea
              placeholder="Question"
              value={q.questionText}
              onChange={(e) => handleChange(index, "questionText", e.target.value)}
              className="w-[655px] h-40 p-2 border-2 border-gray-300 rounded-lg mb-2"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className={`px-5 py-3 ${
            loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
          } text-white font-semibold rounded-lg`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Questions"}
        </button>
      </form>
      <br />
    </div>
  );
};

export default QuestionForm;