const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    subjectCode: {
      type: String,
      required: true,
      trim: true,
    },

    coLevel: {
      type: String,
      enum: ["1", "2", "3"],
      default: "1"
      },

    difficultyLevel: {
      type: String,
      enum: ["1", "2", "3"],
      required: true,
    },
    marks: {
      type: Number,
      required: true,
    },
    questionText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const QuestionModel = mongoose.model("Question", questionSchema);
module.exports = QuestionModel;
