import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AuthenticatedDashboard = () => {
  const [totalVideos, setTotalVideos] = useState(0);
  const [completedVideos, setCompletedVideos] = useState(0);
  const [totalTopics, setTotalTopics] = useState(0);
  const [completedTopics, setCompletedTopics] = useState(0);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await axios.get('http://localhost:5000/api/dashboard/stats', config);
      console.log("Received", response.data)
      const { totalCourses, selectedCourses, allSections, markedSections } = response.data;
      setTotalVideos(totalCourses);
      setCompletedVideos(selectedCourses);
      setTotalTopics(allSections);
      setCompletedTopics(markedSections);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <div className="bg-blue-600 text-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold">Welcome to Apna College Dashboard</h1>
          <p className="mt-2 text-lg">Manage your courses and track your learning progress!</p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <h2 className="text-2xl font-bold text-blue-600">{totalVideos}</h2>
            <p className="text-gray-700 mt-2">Total Videos</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <h2 className="text-2xl font-bold text-blue-600">{completedVideos}</h2>
            <p className="text-gray-700 mt-2">Completed Videos</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <h2 className="text-2xl font-bold text-blue-600">{totalTopics}</h2>
            <p className="text-gray-700 mt-2">Total Topics</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <h2 className="text-2xl font-bold text-blue-600">{completedTopics}</h2>
            <p className="text-gray-700 mt-2">Completed Topics</p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link to="/create-course" className="bg-white p-6 shadow-lg rounded-lg hover:bg-blue-50 transition duration-300">
            <h2 className="text-xl font-bold text-blue-600">Create a Video</h2>
            <p className="mt-2 text-gray-700">Start adding new learning materials for your students.</p>
          </Link>
          <Link to="/courses" className="bg-white p-6 shadow-lg rounded-lg hover:bg-blue-50 transition duration-300">
            <h2 className="text-xl font-bold text-blue-600">View All Videos</h2>
            <p className="mt-2 text-gray-700">Explore the available courses and manage them easily.</p>
          </Link>
          <Link to="/profile" className="bg-white p-6 shadow-lg rounded-lg hover:bg-blue-50 transition duration-300">
            <h2 className="text-xl font-bold text-blue-600">View Your Profile</h2>
            <p className="mt-2 text-gray-700">Update your profile details and track your progress.</p>
          </Link>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Announcements</h2>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <p className="text-lg text-gray-700">🚀 New advanced course on Data Structures is launching soon! Stay tuned for updates.</p>
          </div>
        </div>
      </div>
    </div>
  );
};



export default AuthenticatedDashboard;
