const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoLink: { type: String },
  titleLink: { type: String },
  leetcodeLink: { type: String },
  level: {
    type: String,
    enum: ["easy", "medium", "difficult", "expert"],
    required: true,
  },
  topic: {
    type: String,
    enum: ["recursion", "array", "hashing"],
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
