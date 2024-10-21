import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the Auth context
import '../styles/Header.css';

const Header = () => {
  const { isAuthenticated, logout } = useAuth(); // Access the authentication state and logout function from the context

  return (
    <header className="header">
      <div className="logo">
        <img src="../images/logo.png" alt="InternHub" />
      </div>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#employers">Employers</a></li>
          <li><a href="#about-us">About Us</a></li>
          <li><a href="#contact-us">Contact Us</a></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        {/* Only show Login and Sign Up buttons if the user is not authenticated */}
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
            <Link to="/register">
              <button className="signup-btn">Sign Up</button>
            </Link>
          </>
        ) : (
          <button onClick={logout} className="logout-btn">Logout</button> // Show logout button if authenticated
        )}
      </div>
    </header>
  );
};

export default Header;
