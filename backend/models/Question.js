const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  subjectCode: {
    type: String,
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  coLevel: {
    type: Number,
    required: true,
  },
  difficultyLevel: {
    type: Number,
    required: true,
  },
  questionType: {
    type: String,
    enum: ['short', 'long'],
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
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;