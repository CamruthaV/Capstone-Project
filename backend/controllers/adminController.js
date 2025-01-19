const Question = require("../models/Question");

// Generate a test paper
exports.generateTestPaper = async (req, res) => {
  const { subject, numQuestions, difficultyLevels } = req.body;

  try {
    const questions = await Question.aggregate([
      { $match: { subject, difficultyLevel: { $in: difficultyLevels } } },
      { $sample: { size: numQuestions } },
    ]);

    if (questions.length < numQuestions) {
      return res.status(400).json({
        message: `Not enough questions available for the specified criteria.`,
      });
    }

    res.json({ testPaper: questions });
  } catch (err) {
    res.status(500).json({ message: "Error generating test paper" });
  }
};
