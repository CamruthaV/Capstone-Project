import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import FacultyPage from "./pages/FacultyPage";
import QuestionForm from "./components/QuestionForm";
import QuestionList from "./components/QuestionList";
import GeneratedQuestionsPage from "./pages/GeneratedQuestionsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/faculty" element={<FacultyPage />} />
        <Route path="/add-questions" element={<QuestionForm />} />
        <Route path="/view-questions" element={<QuestionList />} />
        <Route path="/generated-questions" element={<GeneratedQuestionsPage />} />
      </Routes>
    </Router>
  );
};

export default App;