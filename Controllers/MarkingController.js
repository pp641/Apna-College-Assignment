const CourseSelection = require("../Models/CourseSelectionSchema");
const Course = require("../Models/Course");



exports.markCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res
        .status(400)
        .json({
          message: "Invalid request. User ID and course ID must be provided.",
        });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    let courseSelection = await CourseSelection.findOne({ user_id: userId });
    if (!courseSelection) {
      courseSelection = new CourseSelection({
        user_id: userId,
        markedCourses: [],
        markedSections: [],
      });
    }

    if (!courseSelection.markedCourses.includes(courseId)) {
      courseSelection.markedCourses.push(courseId);
    }

    const sectionCourses = await Course.find({ topic: course.topic });
    const allSectionCoursesMarked = sectionCourses.every((c) =>
      courseSelection.markedCourses.includes(c._id.toString())
    );

    if (
      allSectionCoursesMarked &&
      !courseSelection.markedSections.includes(course.topic)
    ) {
      courseSelection.markedSections.push(course.topic);
    }

    await courseSelection.save();

    res.status(200).json({ message: "Marked successfully.", courseSelection });
  } catch (error) {
    console.error("Error marking course:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.unmarkCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res
        .status(400)
        .json({
          message: "Invalid request. User ID and course ID must be provided.",
        });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    let courseSelection = await CourseSelection.findOne({ user_id: userId });

    if (!courseSelection) {
      return res.status(404).json({ message: "Course selection not found." });
    }

    courseSelection.markedCourses = courseSelection.markedCourses.filter(
      (id) => !id.equals(courseId)
    );

    const sectionCourses = await Course.find({ topic: course.topic });

    const anySectionCoursesMarked = sectionCourses.some((c) =>
      courseSelection.markedCourses.includes(c._id.toString())
    );
    courseSelection.markedSections = courseSelection.markedSections.filter(
      (sec) => sec !== course.topic
    );

    if (!anySectionCoursesMarked) {
      courseSelection.markedSections = courseSelection.markedSections.filter(
        (sec) => sec !== course.topic
      );
    }

    await courseSelection.save();
    console.log("sell", courseSelection);
    res
      .status(200)
      .json({ message: "Unmarked successfully.", courseSelection });
  } catch (error) {
    console.error("Error unmarking course:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.markCoursesBySection = async (req, res) => {
  try {
    const { userId, section } = req.body;

    if (!userId || !section) {
      return res
        .status(400)
        .json({
          message: "Invalid request. User ID and section must be provided.",
        });
    }

    const courses = await Course.find({ topic: section });

    if (!courses.length) {
      return res
        .status(404)
        .json({ message: "No courses found for this section." });
    }

    let courseSelection = await CourseSelection.findOne({ user_id: userId });
    if (!courseSelection) {
      courseSelection = new CourseSelection({
        user_id: userId,
        markedCourses: [],
        markedSections: [],
      });
    }

    if (!courseSelection.markedSections.includes(section)) {
      courseSelection.markedSections.push(section);
    }

    courses.forEach((course) => {
      if (!courseSelection.markedCourses.includes(course._id)) {
        courseSelection.markedCourses.push(course._id);
      }
    });

    await courseSelection.save();

    res
      .status(200)
      .json({
        message: `Marked all courses in section '${section}' successfully.`,
        courseSelection,
      });
  } catch (error) {
    console.error("Error marking courses by section:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.unmarkCoursesBySection = async (req, res) => {
  try {
    const { userId, section } = req.body;

    if (!userId || !section) {
      return res
        .status(400)
        .json({
          message: "Invalid request. User ID and section must be provided.",
        });
    }

    const courses = await Course.find({ topic: section });

    if (!courses.length) {
      return res
        .status(404)
        .json({ message: "No courses found for this section." });
    }

    let courseSelection = await CourseSelection.findOne({ user_id: userId });

    if (!courseSelection) {
      return res.status(404).json({ message: "Course selection not found." });
    }

    courseSelection.markedSections = courseSelection.markedSections.filter(
      (sec) => sec !== section
    );

    courseSelection.markedCourses = courseSelection.markedCourses.filter(
      (courseId) => {
        return !courses.some((course) => course._id.equals(courseId));
      }
    );

    await courseSelection.save();

    res
      .status(200)
      .json({
        message: `Unmarked all courses in section '${section}' successfully.`,
        courseSelection,
      });
  } catch (error) {
    console.error("Error unmarking courses by section:", error);
    res.status(500).json({ message: "Server error." });
  }
};
