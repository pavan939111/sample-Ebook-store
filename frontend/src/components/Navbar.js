import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleProtectedClick = (path) => {
    if (isAuthenticated) {
      navigate(path);
      setMenuOpen(false); // ✅ Close menu on navigation
    } else {
      alert('Please log in first!');
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    navigate('/');
    setMenuOpen(false); // ✅ Close menu on logout
  };

  // ✅ Clicking title will toggle menu only on mobile
  const handleTitleClick = () => {
    if (window.innerWidth <= 768) {
      setMenuOpen(false);
    } else {
      navigate('/home');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <div className="navbar-title" onClick={handleTitleClick}>
          📚 Online Book Store
        </div>
        <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>

      <div className={`navbar-links ${menuOpen ? 'show' : ''}`}>
        <span onClick={() => handleProtectedClick('/home')}>Home</span>
        <span onClick={() => handleProtectedClick('/search')}>Search</span>
        <span onClick={() => handleProtectedClick('/catalogue')}>Catalogue</span>

        {isAuthenticated && username ? (
          <Link to={`/profile/${username}`} onClick={() => setMenuOpen(false)}>
            Profile
          </Link>
        ) : (
          <span onClick={() => alert('Please log in first!')}>Profile</span>
        )}

        <span onClick={() => handleProtectedClick('/addbook')}>Add Book</span>

        {!isAuthenticated ? (
          <>
            <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          </>
        ) : (
          <span onClick={handleLogout}>Logout</span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
