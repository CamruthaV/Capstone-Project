// filepath: backend/controllers/questionController.js
const Question = require("../models/Question");

// Add new questions
exports.addQuestion = async (req, res) => {
  const { subjectCode, coLevel, difficultyLevel, marks, questionText } = req.body;

  try {
    const newQuestion = new Question({
      subjectCode,
      coLevel,
      difficultyLevel,
      marks,
      questionText,
      addedBy: req.user.role, // Use user role instead of user id
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding question" });
  }
};

// Get all questions (admin)
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching questions" });
  }
};

// Get questions added by the logged-in faculty
exports.getMyQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ addedBy: req.user.id });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching your questions" });
  }
};

// Update a question
exports.updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { questionText, subject, difficultyLevel, marks, image } = req.body;

  try {
    const question = await Question.findOne({ _id: id, addedBy: req.user.id });

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.questionText = questionText || question.questionText;
    question.subject = subject || question.subject;
    question.difficultyLevel = difficultyLevel || question.difficultyLevel;
    question.marks = marks || question.marks;
    question.image = image || question.image;

    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
  } catch (err) {
    res.status(500).json({ message: "Error updating question" });
  }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findOneAndDelete({ _id: id, addedBy: req.user.id });

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting question" });
  }
};

// Generate a question paper (admin)
exports.generateQuestionPaper = async (req, res) => {
  try {
    const { subjectCode, numberOfQuestions, difficultyLevel } = req.body;

    // const questions = await Question.aggregate([
    //   { $match: { subjectCode:123, difficultyLevel:1  } }, // Filter by subject and difficulty
    //   { $sample: { size: 2 } }, // Random selection
    // ]);

    const questions = await Question.find({
      subjectCode : subjectCode,
      difficultyLevel: difficultyLevel, // Now using "1" instead of "easy"
    }).limit(numberOfQuestions);

    res.status(200).json({ message: "Question paper generated", questions });
  } catch (err) {
    res.status(500).json({ message: "Failed to generate question paper", error: err.message });
  }
};