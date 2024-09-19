import React, { useEffect, useState } from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import HomePage from './HomeComponentMain';

const Dashboard = () => {
  const [authtoken, setAuthToken] = useState(localStorage.getItem('token'));
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== authtoken) {
      setAuthToken(token);
    }
  }, [authtoken]);

  return authtoken ? <AuthenticatedComponent /> : <HomePage />;
};

export default Dashboard;
