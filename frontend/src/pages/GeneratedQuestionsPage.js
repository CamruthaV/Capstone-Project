import React from "react";
import { useLocation } from "react-router-dom";

const GeneratedQuestionsPage = () => {
  const location = useLocation();
  const { questions } = location.state || { questions: [] };

  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold mb-8">Generated Questions</h1>
      {questions.length > 0 ? (
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={index} className="border-b-2 border-gray-200 pb-4">
              <h2 className="text-2xl font-semibold mb-2">
                Question {index + 1}
              </h2>
              <p className="text-lg mb-2"><strong>Subject Code:</strong> {question.subjectCode}</p>
              <p className="text-lg mb-2"><strong>CO Level:</strong> {question.coLevel}</p>
              <p className="text-lg mb-2"><strong>Difficulty Level:</strong> {question.difficultyLevel}</p>
              <p className="text-lg mb-2"><strong>Marks:</strong> {question.marks}</p>
              <p className="text-lg"><strong>Question:</strong> {question.questionText}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg">No questions found.</p>
      )}
    </div>
  );
};

export default GeneratedQuestionsPage;