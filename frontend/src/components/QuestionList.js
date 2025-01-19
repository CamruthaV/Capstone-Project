import React, { useState, useEffect } from "react";
import axios from "axios";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/questions");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <h1>Questions List</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            {question.question} - Difficulty: {question.difficulty} - Marks:{" "}
            {question.marks}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
