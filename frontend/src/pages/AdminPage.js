import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const subjects = [
  "Data Structures",
  "Computer Organization and Architecture (COA)",
  "Computer Networks",
  "Operating Systems",
  "Design and Analysis of Algorithms",
];

const AdminPage = () => {
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");
  // const [coLevel, setCoLevel] = useState(1);
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [questionType, setQuestionType] = useState({
    shortQuestions: "",
    longQuestions: "",
  });
  const [examType, setExamType] = useState("");

  const setShortQuestions = (value) => {
    setQuestionType((prev) => ({ ...prev, shortQuestions: value }));
  };

  const setLongQuestions = (value) => {
    setQuestionType((prev) => ({ ...prev, longQuestions: value }));
  };

  const { shortQuestions, longQuestions } = questionType;
  const navigate = useNavigate();

  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSubjectChange = (value) => {
    setSubjectName(value);
    setFilteredSubjects(
      subjects.filter((subject) =>
        subject.toLowerCase().startsWith(value.toLowerCase())
      )
    );
    setShowDropdown(true);
  };

  const handleSubjectSelect = (subject) => {
    setSubjectName(subject);
    setFilteredSubjects([]);
    setShowDropdown(false); // Clear the dropdown after selection
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/questions/random", {
        params: {
          numShort: shortQuestions,
          numLong: longQuestions,
          difficultyLevel,
        },
      });
      const {
        shortQuestions: fetchedShortQuestions,
        longQuestions: fetchedLongQuestions,
      } = response.data;
      const questions = [...fetchedShortQuestions, ...fetchedLongQuestions];
      navigate("/generated-questions", { state: { questions, examType } });
    } catch (error) {
      console.error("Error generating question paper:", error);
    }
  };

  return (
    <div className="text-center mt-7">
      <h1 className="text-4xl font-bold mb-10">Welcome Admin</h1>
      <form onSubmit={handleGenerate} className="space-y-8">
        <div className="flex justify-center space-x-4 mb-4">
          {/* First Row: Subject Code and Subject Name */}
          <div className="flex flex-col items-center">
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

          <div className="flex flex-col items-center relative">
            <label className="block text-xl font-semibold mb-2">
              Subject Name
            </label>
            <input
              type="text"
              placeholder="Select Subject"
              value={subjectName}
              onChange={(e) => handleSubjectChange(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              className="w-80 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              required
            />
            {showDropdown && filteredSubjects.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto">
                {filteredSubjects.map((subject, i) => (
                  <li
                    key={i}
                    onClick={() => handleSubjectSelect(subject)}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                  >
                    {subject}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Second Row: CO Level and Difficulty Level */}
        <div className="flex justify-center space-x-4 mb-4">
          {/* <div className="flex flex-col items-center">
            <label className="block text-xl font-semibold mb-2">CO Level</label>
            <select
              value={coLevel}
              onChange={(e) => setCoLevel(e.target.value)}
              className="w-80 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg bg-white"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div> */}

          <div className="flex flex-col items-center">
            <label className="block text-xl font-semibold mb-2">
              Exam Type
            </label>
            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="w-80 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg bg-white"
            >
              <option value="">Select Exam Type</option>
              <option value="Mid Sem">Mid Sem</option>
              <option value="End Sem">End Sem</option>
            </select>
          </div>

          <div className="flex flex-col items-center">
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
        </div>

        {/* Third Row: Number of Short Questions and Number of Long Questions */}
        <div className="flex justify-center space-x-4 mb-4">
          <div className="flex flex-col items-center">
            <label className="block text-xl font-semibold mb-2">
              Number of Short Questions
            </label>
            <input
              type="number"
              value={shortQuestions}
              onChange={(e) => setShortQuestions(e.target.value)}
              required
              className="w-80 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="block text-xl font-semibold mb-2">
              Number of Long Questions
            </label>
            <input
              type="number"
              value={longQuestions}
              onChange={(e) => setLongQuestions(e.target.value)}
              required
              className="w-80 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-10 py-4 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Generate Question Paper
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
