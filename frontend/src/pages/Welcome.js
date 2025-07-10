import React from 'react';
import Navbar from '../components/Navbar';
// import './Home.css';
import './Welcome.css';


function Welcome() {
  return (
    <div className="home-container welcome-background">
      <Navbar />
      <div className="welcome-message">
        <h1>Welcome to the Online Book Store 📘</h1>
        <p>
          Discover and manage your favorite books across genres.<br />
          Register or Login to get started 📚
        </p>
      </div>
    </div>
  );
}

export default Welcome;
