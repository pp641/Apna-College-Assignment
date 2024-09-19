const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSelectionSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  markedCourses: {
    type: [Schema.Types.ObjectId],
    ref: "Course",
  },
  markedSections: {
    type: [String],
    enum: ["recursion", "array", "hashing"],
  },
});

const CourseSelection = mongoose.model(
  "CourseSelection",
  CourseSelectionSchema
);

module.exports = CourseSelection;
