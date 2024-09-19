import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import CreateCourse from './Components/CourseForm';
import ViewCourses from './Components/CourseList';
import PrivateRoute from './Components/PrivateRoute'; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-course"
          element={
            <PrivateRoute>
              <CreateCourse />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <PrivateRoute>
              <ViewCourses />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
