import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthenticatedComponent = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `http://localhost:5000/api/auth/profile/${userId}`,
          config
        );
        setUserDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching user details. Please log in again.");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center">User Details</h2>

        {userDetails && (
          <div className="text-center">
            <p className="text-lg font-medium">
              <span className="font-bold">Username:</span>{" "}
              {userDetails.username}
            </p>
            <p className="text-lg font-medium">
              <span className="font-bold">Email:</span> {userDetails.email}
            </p>
            <p className="text-lg font-medium">
              <span className="font-bold">User ID:</span> {userDetails._id}
            </p>
          </div>
        )}

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 mt-4"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default AuthenticatedComponent;
