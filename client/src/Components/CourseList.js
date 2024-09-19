import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const userId = localStorage.getItem("userId");

  const groupCoursesByTopic = (courses) => {
    const topics = {};
    courses.forEach((course) => {
      const topic = course.topic;
      if (!topics[topic]) {
        topics[topic] = [];
      }
      topics[topic].push(course);
    });
    return topics;
  };

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:5000/api/courses/all",
        config
      );
      setCourses(response.data.courses);
      setSections(response.data.isMarkedSections);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const topics = groupCoursesByTopic(courses);

  const handleTopicChange = async (topic) => {
    try {
      let shouldCheck = sections.includes(topic);
      const token = localStorage.getItem("token");
      const endpoint = shouldCheck
        ? "http://localhost:5000/api/course/unmarkbySection"
        : "http://localhost:5000/api/course/markbySection";
      await axios.post(endpoint, { userId, section: topic }, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => { fetchCourses(); })
        .catch((error) => { console.log("Error", error); });
    } catch (error) {
      console.error("Error marking/unmarking course:", error);
    }
  };

  const handleCourseCheck = async (course) => {
    try {
      const courseId = course._id;
      let shouldCheck = course.isMarked;
      const token = localStorage.getItem("token");
      const endpoint = shouldCheck
        ? "http://localhost:5000/api/course/unmark"
        : "http://localhost:5000/api/course/mark";
      await axios.post(endpoint, { userId, courseId }, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => { fetchCourses(); });
    } catch (error) {
      console.error("Error marking/unmarking course:", error);
    }
  };

  return (
    <div className="container mx-auto my-10 p-6 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Course Management</h1>
      {Object.keys(topics)
        .sort()
        .map((topic) => (
          <Accordion key={topic} className="mb-6">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${topic}-content`}
              id={`panel-${topic}-header`}
              className="bg-blue-100 rounded-md shadow-md"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={sections.includes(topic)}
                    onChange={() => handleTopicChange(topic)}
                    inputProps={{ "aria-label": `Check all ${topic} courses` }}
                  />
                }
                label={
                  <Typography
                    variant="h5"
                    className="font-bold text-blue-600"
                  >{`Topic: ${topic}`}</Typography>
                }
              />
            </AccordionSummary>
            <AccordionDetails className="bg-white shadow-inner rounded-lg p-4">
              <ol className="list-decimal ml-5">
                {topics[topic].map((course, index) => (
                  <li key={course._id} className="mb-4">
                    <div className="flex items-start bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={course.isMarked || false}
                            onChange={() => handleCourseCheck(course)}
                            inputProps={{
                              "aria-label": `Check course ${course.title}`,
                            }}
                          />
                        }
                        label={
                          <div className="ml-4">
                            <Typography variant="h6" className="font-medium text-gray-700">
                              <span className="text-blue-600 font-bold">Title:</span> {course.title}
                            </Typography>
                            <Typography variant="h6" className="font-medium text-gray-700">
                              <span className="text-blue-600 font-bold">Difficulty:</span> {course.level}
                            </Typography>
                            <Typography variant="h6" className="font-medium text-gray-700">
                              <span className="text-blue-600 font-bold">LeetCode:</span> 
                              <a
                                href={course.leetcodeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                              >
                                Leetcode
                              </a>
                            </Typography>
                            <Typography variant="h6" className="font-medium text-gray-700">
                              <span className="text-blue-600 font-bold">Video:</span> 
                              <a
                                href={course.videoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                              >
                                Watch Video
                              </a>
                            </Typography>
                          </div>
                        }
                      />
                    </div>
                  </li>
                ))}
              </ol>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
};

export default CourseList;
