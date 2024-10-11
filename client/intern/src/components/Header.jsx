import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/assets/logo.png" alt="InternHub" />
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
      <Link to="/login">
        <button className="login-btn">Login</button>
      </Link>
      <Link to="/register">
        <button className="signup-btn">Sign Up</button>
      </Link>
      </div>
    </header>
  );
};

export default Header;
