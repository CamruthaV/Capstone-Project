const mongoose = require("mongoose");

const generatedPaperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to Admin who created it
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question", // Reference the questions included in the paper
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("GeneratedPaper", generatedPaperSchema);
