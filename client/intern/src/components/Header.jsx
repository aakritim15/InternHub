import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the Auth context
import '../styles/Header.css';

const Header = () => {
  const { isAuthenticated, logout } = useAuth(); // Access the authentication state and logout function from the context

  return (
    <header className="header">
      <div className="logo" style={{display: 'flex', flexDirection: 'row', gap: '2vh', fontWeight: 'bold', fontSize: '4vh', justifyItems: 'center', alignItems: 'center'}}>
        <img src="/logo.svg" alt="InternHub" style={{width: '7vh', height: '7vh'}} />
        <div style={{color: '#6300b3'}}>InternHub</div>
      </div>
      <nav>
        <ul>
          <li><Link to='/'>HOME</Link></li>
          
          <li><Link to="/appliedjobs">APPLIED JOBS</Link></li>
          <li><Link to="/createProfile">CREATE PROFILE</Link></li>
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
