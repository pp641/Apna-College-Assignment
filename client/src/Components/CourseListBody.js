import React from "react";

const CourseListBody = ({ courses }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Courses</h2>
      {console.log("oko", courses)}
      {(courses || [])?.map((course, index) => (
        <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
          <p>
            <strong>Video Link:</strong>{" "}
            <a
              href={course.videoLink}
              className="text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              {course.videoLink}
            </a>
          </p>
          <p>
            <strong>Title Link:</strong>{" "}
            <a
              href={course.titleLink}
              className="text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              {course.titleLink}
            </a>
          </p>
          <p>
            <strong>LeetCode Link:</strong>{" "}
            <a
              href={course.leetcodeLink}
              className="text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              {course.leetcodeLink}
            </a>
          </p>
          <p>
            <strong>Level:</strong> {course.level}
          </p>
          <p>
            <strong>Topic:</strong> {course.topic}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CourseListBody;
