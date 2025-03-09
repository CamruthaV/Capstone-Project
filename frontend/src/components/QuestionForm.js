import React, { useState } from "react";
import axios from "../api/axios";
import { useSearchParams } from "react-router-dom";

const subjects = [
  "Data Structures",
  "Computer Organization and Architecture (COA)",
  "Computer Networks",
  "Operating Systems",
  "Design and Analysis of Algorithms",
];

const QuestionForm = () => {
  const [searchParams] = useSearchParams();
  const numQuestions = parseInt(searchParams.get("num"), 10) || 1;
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(
    Array.from({ length: numQuestions }, () => ({
      subjectCode: "",
      subjectName: "",
      coLevel: "",
      difficultyLevel: "",
      questionType: "",
      marks: "",
      questionText: "",
    }))
  );
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubjectChange = (index, value) => {
    handleChange(index, "subjectName", value);
    setFilteredSubjects(
      subjects.filter((subject) =>
        subject.toLowerCase().startsWith(value.toLowerCase())
      )
    );
    setShowDropdown(true);
  };

  const handleSubjectSelect = (index, subject) => {
    handleChange(index, "subjectName", subject);
    setFilteredSubjects([]);
    setShowDropdown(false); // Clear the dropdown after selection
  };

  const validateQuestions = () => {
    for (const q of questions) {
      if (
        !q.subjectCode ||
        !q.subjectName ||
        !q.coLevel ||
        !q.difficultyLevel ||
        !q.questionType ||
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
            subjectName: "",
            coLevel: "",
            difficultyLevel: "",
            questionType: "",
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

            {/* First Row: Subject Code and Subject Name */}
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

              <div className="relative w-80">
                <input
                  type="text"
                  placeholder="Select Subject"
                  value={q.subjectName}
                  onChange={(e) => handleSubjectChange(index, e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  className="w-full p-2 border-2 border-gray-300 rounded-lg"
                  required
                />
                {showDropdown && filteredSubjects.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto">
                    {filteredSubjects.map((subject, i) => (
                      <li
                        key={i}
                        onClick={() => handleSubjectSelect(index, subject)}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        {subject}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Second Row: CO Level and Difficulty */}
            <div className="flex justify-center space-x-4 mb-4">
              <select
                value={q.coLevel}
                onChange={(e) => handleChange(index, "coLevel", e.target.value)}
                className="w-80 p-2 border-2 border-gray-300 rounded-lg"
                placeholder="Select CO Level"
              >
                <option value="" disabled>
                  Select CO Level
                </option>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
                <option value="4">Level 4</option>
                <option value="5">Level 5</option>
              </select>

              <select
                value={q.difficultyLevel}
                onChange={(e) =>
                  handleChange(index, "difficultyLevel", e.target.value)
                }
                className="w-80 p-2 border-2 border-gray-300 rounded-lg"
                placeholder="Select Difficulty"
              >
                <option value="" disabled>
                  Select Difficulty (BTL Levels)
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>

            {/* Third Row: Question Type and Marks */}
            <div className="flex justify-center space-x-4 mb-4">
              <select
                value={q.questionType}
                onChange={(e) =>
                  handleChange(index, "questionType", e.target.value)
                }
                className="w-80 p-2 border-2 border-gray-300 rounded-lg"
                placeholder="Select Question Type"
              >
                <option value="" disabled>
                  Select Question Type
                </option>
                <option value="short">Short Answer</option>
                <option value="long">Long Answer</option>
              </select>

              <input
                type="number"
                placeholder="Marks"
                value={q.marks}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (
                    (q.questionType === "short" && value >= 1 && value < 5) ||
                    (q.questionType === "long" && value >= 5 && value <= 10)
                  ) {
                    handleChange(index, "marks", e.target.value);
                  } else {
                    alert(
                      q.questionType === "short"
                        ? "Marks for short answer should be between 1 and 4."
                        : "Marks for long answer should be between 5 and 10."
                    );
                  }
                }}
                className="w-80 p-2 border-2 border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Textarea for Question */}
            <textarea
              placeholder="Question"
              value={q.questionText}
              onChange={(e) =>
                handleChange(index, "questionText", e.target.value)
              }
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