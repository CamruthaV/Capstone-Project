// filepath: backend/routes/questionRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  addQuestion,
  getAllQuestions,
  getMyQuestions,
  deleteQuestion,
  updateQuestion,
  generateQuestionPaper,
} = require("../controllers/questionController");

// Faculty routes
router.post("/", authMiddleware, roleMiddleware("faculty"), addQuestion);
router.put("/:id", authMiddleware, roleMiddleware("faculty"), updateQuestion);
router.delete("/:id", authMiddleware, roleMiddleware("faculty"), deleteQuestion);
router.get("/my", authMiddleware, roleMiddleware("faculty"), getMyQuestions);

// Admin routes
router.get("/all", authMiddleware, roleMiddleware("admin"), getAllQuestions);
router.post("/generate", authMiddleware, roleMiddleware("admin"), generateQuestionPaper);

// Batch add questions
router.post("/batch", authMiddleware, roleMiddleware("faculty"), async (req, res) => {
  try {
    const questions = req.body.questions;
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Invalid question data." });
    }

    // Validate each question in the batch
    for (const question of questions) {
      if (
        !question.subjectCode ||
        !question.coLevel ||
        !question.difficultyLevel ||
        !question.marks ||
        !question.questionText
      ) {
        return res.status(400).json({ message: "Each question must have all fields filled." });
      }
    }

    // Save questions to the database
    await Question.insertMany(questions);
    res.status(201).json({ message: "Questions submitted successfully!" });
  } catch (error) {
    console.error("Error inserting batch questions:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;