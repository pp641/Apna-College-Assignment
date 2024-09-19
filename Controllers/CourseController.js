const Course = require("../Models/Course");
const CourseSelection = require("../Models/CourseSelectionSchema");

const createCourse = async (req, res) => {
  try {
    const { title, videoLink, titleLink, leetcodeLink, level, topic } =
      req.body;

    if (
      !title ||
      !videoLink ||
      !titleLink ||
      !level ||
      !topic ||
      !leetcodeLink
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCourse = new Course({
      title,
      videoLink,
      titleLink,
      leetcodeLink,
      level,
      topic,
    });
    await newCourse.save();
    res
      .status(201)
      .json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    console.log("Error12", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const courseSelection = await CourseSelection.findOne({
      user_id: userId,
    }).exec();
    const courses = await Course.find({}).exec();
    const markedCourses = courseSelection ? courseSelection.markedCourses : [];
    const markedSections = courseSelection
      ? courseSelection.markedSections
      : [];
    const coursesWithStatus = courses.map((course) => ({
      ...course._doc,
      isMarked: markedCourses.includes(course._id),
    }));

    res.status(200).json({
      message: "Courses retrieved successfully",
      courses: coursesWithStatus,
      isMarkedSections: courseSelection.markedSections,
    });
  } catch (error) {
    console.error("Error retrieving courses:", error);
    res.status(500).json({ error: "Server error", error: error });
  }
};

const getStatsByUser = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("Finding for user ID:", userId);
        const courseSelection = await CourseSelection.findOne({ user_id: userId });
        const selectedCourses = courseSelection ? courseSelection.markedCourses.length : [];
        const markedSections = courseSelection ? courseSelection.markedSections.length : [];
        const totalCourses = await Course.countDocuments();
        const allSections = (await Course.distinct('topic')).length;
        console.log("Stats:", { selectedCourses, totalCourses, markedSections, allSections });
                return res.json({ selectedCourses, totalCourses, markedSections, allSections });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ error: 'An error occurred while fetching the data.' });
    }
};

module.exports = {
  createCourse,
  getAllCourses,
  getStatsByUser
};
