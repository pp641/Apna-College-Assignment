import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Apna College</h1>
          <nav>
            <Link to="/login" className="bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition duration-300">Login</Link>
            <Link to="/register" className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">Sign Up</Link>
          </nav>
        </div>
      </header>

      <section className="flex-grow bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-800">Welcome to Apna College</h2>
          <p className="text-lg mb-8 text-gray-600">Your gateway to a world of knowledge. Join us to explore a variety of courses and enhance your skills.</p>
          <Link to="/register" className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-600 transition duration-300">Get Started</Link>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8 text-gray-800">Why Choose Us?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-4 text-blue-600">Diverse Courses</h4>
              <p className="text-gray-700">Explore a wide range of courses designed to help you succeed in your career.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-4 text-blue-600">Expert Instructors</h4>
              <p className="text-gray-700">Learn from experienced professionals and industry experts.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-4 text-blue-600">Flexible Learning</h4>
              <p className="text-gray-700">Access courses anytime, anywhere with our user-friendly platform.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-500 text-white py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Learning?</h3>
          <p className="text-lg mb-8">Sign up today and take the first step towards achieving your goals.</p>
          <Link to="/register" className="bg-white text-blue-500 py-3 px-6 rounded-lg text-lg hover:bg-gray-100 transition duration-300">Sign Up Now</Link>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">&copy; 2024 Apna College. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
