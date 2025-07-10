import React from 'react';
import './Sidebar.css';

function Sidebar({ onGenreSelect }) {
  const genres = [
    'All',
    'Fiction',
    'Non-Fiction',
    'Fantasy',
    'Mystery',
    'Romance',
    'Science',
    'Lifestyle',
    'History',
    'Dystopian Fiction',
    'Finance'
  ];

  return (
    <aside className="sidebar">
      <h3>Genres</h3>
      <ul>
        {genres.map((genre) => (
          <li key={genre} onClick={() => onGenreSelect(genre)}>
            {genre}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
