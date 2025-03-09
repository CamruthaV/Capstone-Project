import React from "react";
import { useLocation } from "react-router-dom";

const GeneratedQuestionsPage = () => {
  const location = useLocation();
  const { questions, examType } = location.state || { questions: [], examType: "" };

  // Assuming all questions have the same subjectCode, subjectName, coLevel, difficultyLevel, and dateCreated
  const subjectCode = questions.length > 0 ? questions[0].subjectCode : "";
  const subjectName = questions.length > 0 ? questions[0].subjectName : "";
  const dateCreated = new Date().toLocaleDateString("en-GB");

  // Separate short and long questions
  const shortQuestions = questions.filter(q => q.questionType === "short");
  const longQuestions = questions.filter(q => q.questionType === "long");

  // Sort questions by CO Level and then by marks
  const sortQuestions = (questions) => {
    return questions.sort((a, b) => {
      if (a.coLevel === b.coLevel) {
        return a.marks - b.marks;
      }
      return a.coLevel - b.coLevel;
    });
  };

  const sortedShortQuestions = sortQuestions(shortQuestions);
  const sortedLongQuestions = sortQuestions(longQuestions);

  return (
    <div className="text-center mt-10">
      <div className="flex items-center justify-center mb-8">
        {/* Logo section */}
        <div className="m-4">
          <img src="/GITAM-logo.png" alt="Logo" className="h-20 w-auto print:h-20 print:w-auto" />
        </div>

        {/* Info Box */}
        <div className="m-2 p-2 border-2 border-gray-300 rounded-lg bg-white shadow-md w-full max-w-2xl print:max-w-full">
          <div className="grid grid-cols-2 gap-4">
            <p className="text-lg"><strong>Subject Code:</strong> {subjectCode}</p>
            <p className="text-lg"><strong>Subject Name:</strong> {subjectName}</p>
            <p className="text-lg"><strong>Type of Exam:</strong> {examType}</p>
            <p className="text-lg"><strong>Date Created:</strong> {dateCreated}</p>
          </div>
        </div>
      </div>

      {/* Short Questions section */}
      {sortedShortQuestions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Short Questions</h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-2xl mx-auto bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300">Question No.</th>
                  <th className="py-2 px-4 border-b border-gray-300">Question</th>
                  <th className="py-2 px-4 border-b border-gray-300">CO Level</th>
                  <th className="py-2 px-4 border-b border-gray-300">BTL Level</th>
                  <th className="py-2 px-4 border-b border-gray-300">Marks</th>
                </tr>
              </thead>
              <tbody>
                {sortedShortQuestions.map((question, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-300">{index + 1}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{question.questionText}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{question.coLevel}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{question.difficultyLevel}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{question.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Long Questions section */}
      {sortedLongQuestions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Long Questions</h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-2xl mx-auto bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300">Question No.</th>
                  <th className="py-2 px-4 border-b border-gray-300">Question</th>
                  <th className="py-2 px-4 border-b border-gray-300">CO Level</th>
                  <th className="py-2 px-4 border-b border-gray-300">BTL Level</th>
                  <th className="py-2 px-4 border-b border-gray-300">Marks</th>
                </tr>
              </thead>
              <tbody>
                {sortedLongQuestions.map((question, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-300">{index + 1}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{question.questionText}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{question.coLevel}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{question.difficultyLevel}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{question.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {questions.length === 0 && <p className="text-lg">No questions found.</p>}

      {/* Print function button */}
      {questions.length > 0 && (
        <div className="mt-8 print:hidden">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Print Questions
          </button>
        </div>
      )}
    </div>
  );
};

export default GeneratedQuestionsPage;