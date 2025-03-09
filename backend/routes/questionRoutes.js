const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/roleMiddleware");
const Question = require("../models/Question");
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
        !question.subjectName ||
        !question.coLevel ||
        !question.difficultyLevel ||
        !question.questionType ||
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

// Helper function to get weighted random questions
const getWeightedRandomQuestions = async (questionType, numQuestions, difficultyMapping) => {
  const questions = [];

  for (const [difficulty, weight] of Object.entries(difficultyMapping)) {
    const count = Math.round(numQuestions * weight);
    const fetchedQuestions = await Question.aggregate([
      { $match: { questionType, difficultyLevel: parseInt(difficulty, 10) } },
      { $sample: { size: count } }
    ]);
    questions.push(...fetchedQuestions);
  }

  // Shuffle the questions to ensure randomness
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }

  return questions.slice(0, numQuestions);
};

// Endpoint to get random questions
router.get("/random", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  const { numShort, numLong, difficultyLevel } = req.query;

  try {
    let shortDifficultyMapping = {};
    let longDifficultyMapping = {};

    if (difficultyLevel === '1') {
      shortDifficultyMapping = { 1: 0.5, 2: 0.5 };
      longDifficultyMapping = { 1: 0.5, 2: 0.5 };
    } else if (difficultyLevel === '2') {
      shortDifficultyMapping = { 1: 0.25, 2: 0.25, 3: 0.25, 4: 0.25 };
      longDifficultyMapping = { 1: 0.25, 2: 0.25, 3: 0.25, 4: 0.25 };
    } else if (difficultyLevel === '3') {
      shortDifficultyMapping = { 1: 0.15, 2: 0.15, 3: 0.15, 4: 0.15, 5: 0.2, 6: 0.2 };
      longDifficultyMapping = { 1: 0.15, 2: 0.15, 3: 0.15, 4: 0.15, 5: 0.2, 6: 0.2 };
    }

    const shortQuestions = await getWeightedRandomQuestions('short', parseInt(numShort, 10), shortDifficultyMapping);
    const longQuestions = await getWeightedRandomQuestions('long', parseInt(numLong, 10), longDifficultyMapping);

    res.status(200).json({ shortQuestions, longQuestions });
  } catch (error) {
    console.error('Error fetching random questions:', error);
    res.status(500).json({ message: 'Error fetching random questions' });
  }
});

module.exports = router;