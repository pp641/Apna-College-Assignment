const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/IsLoggedIn");
const {
  createCourse,
  getAllCourses,
  getStatsByUser,
} = require("../Controllers/CourseController");
const {
  unmarkCourse,
  markCourse,
  markCoursesBySection,
  unmarkCoursesBySection,
} = require("../Controllers/MarkingController");

router.post("/courses/new", [authMiddleware], createCourse);
router.get("/courses/all", [authMiddleware], getAllCourses);
router.post("/course/mark", [authMiddleware], markCourse);
router.post("/course/unmark", [authMiddleware], unmarkCourse);
router.post("/course/markbySection", [authMiddleware], markCoursesBySection);
router.get("/dashboard/stats", [authMiddleware], getStatsByUser  )
router.post(
  "/course/unmarkbySection",
  [authMiddleware],
  unmarkCoursesBySection
);

module.exports = router;
