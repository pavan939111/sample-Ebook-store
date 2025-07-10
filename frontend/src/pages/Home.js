import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BookList from '../components/BookList';
import './Home.css';

function Home() {
  const [selectedGenre, setSelectedGenre] = useState('All');

  return (
    <div className="home-container">
      <Navbar />

      {/* Mobile Sidebar BELOW Navbar */}
      <div className="mobile-sidebar">
        <Sidebar onGenreSelect={setSelectedGenre} />
      </div>

      {/* Main Content for desktop */}
      <div className="main-content">
        <div className="sidebar desktop-only">
          <Sidebar onGenreSelect={setSelectedGenre} />
        </div>

        <div className="booklist-wrapper">
          <BookList selectedGenre={selectedGenre} />
        </div>
      </div>
    </div>
  );
}

export default Home;


