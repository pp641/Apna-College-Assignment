import React, { useState } from 'react';
import axios from 'axios';

const CourseForm = () => {
  const [title, setTitle] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [titleLink, setTitleLink] = useState('');
  const [leetcodeLink, setLeetcodeLink] = useState('');
  const [level, setLevel] = useState('easy');
  const [topic, setTopic] = useState('recursion');
  const [error, setError] = useState('');
  const [success , setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post('http://localhost:5000/api/courses/new', {
        title,
        videoLink,
        titleLink,
        leetcodeLink,
        level,
        topic,
      }, config).then(()=>{
        setSuccess('Course created successfully');
      })
      setTitle('');
      setVideoLink('');
      setTitleLink('');
      setLeetcodeLink('');
      setLevel('easy');
      setTopic('recursion');
      setError('');
      window.location.origin();
    } catch (err) {
      console.log('Error creating course', err);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Video Link</label>
          <input
            type="url"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Article Link</label>
          <input
            type="url"
            value={titleLink}
            onChange={(e) => setTitleLink(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">LeetCode Link</label>
          <input
            type="url"
            value={leetcodeLink}
            onChange={(e) => setLeetcodeLink(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="difficult">Difficult</option>
            <option value="expert">Expert</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Topic</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="recursion">Recursion</option>
            <option value="array">Array</option>
            <option value="hashing">Hashing</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Course
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </form>
    </React.Fragment>
  );
};

export default CourseForm;
