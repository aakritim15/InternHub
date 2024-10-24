import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the Auth context
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Current user state
  const [error, setError] = useState(null); // Error state for login
  const navigate = useNavigate(); // Navigation hook

  // Login function to set the user and navigate to home
  const login = (userData) => {
    setCurrentUser(userData); // Assume userData has userId and token
    setError(null); // Clear any previous errors
    navigate('/'); // Navigate to the home page after login
  };

  // Logout function to clear the user and navigate to login
  const logout = () => {
    setCurrentUser(null);
    navigate('/login'); // Navigate to login page after logout
  };

  // Function to handle errors
  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  const value = {
    currentUser,
    setCurrentUser,
    isAuthenticated: !!currentUser, // Determine if the user is logged in
    userId: currentUser ? currentUser.id : null, // Extract userId from currentUser
    login,
    logout,
    error, // Provide the error state
    handleError, // Provide the error handler
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
