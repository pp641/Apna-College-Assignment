import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (!token) return null;

  return (
    <nav className="bg-gray-800 text-white py-4 px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-semibold">
            Home
          </Link>
          <Link to="/create-course" className="hover:text-gray-300">
            Create Course
          </Link>
          <Link to="/courses" className="hover:text-gray-300">
            View All Courses
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="hover:text-gray-300">
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="hover:text-gray-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
