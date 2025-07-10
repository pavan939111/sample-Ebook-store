import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // ✅ Add this line
import './SearchPage.css';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [searched, setSearched] = useState(false);
  const [addingToCart, setAddingToCart] = useState(null);

  const username = localStorage.getItem('username');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books/search?title=${query}`);
      setBooks(response.data);
      setSearched(true);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleAddToCart = async (bookTitle) => {
    if (!username) {
      alert('Please log in to add books to cart!');
      return;
    }

    setAddingToCart(bookTitle);

    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, bookId: bookTitle }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Book added to cart successfully!');
      } else {
        alert(`❌ ${data.error || 'Failed to add book to cart'}`);
      }
    } catch (err) {
      console.error('Add to cart error:', err);
      alert('❌ Failed to add book to cart. Please try again.');
    } finally {
      setAddingToCart(null);
    }
  };

  return (
    <>
      <Navbar /> {/* ✅ Add fixed navbar */}
      <div className="search-page">
        <h1 className="search-title">Search Books</h1>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter book title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        {searched && books.length === 0 && (
          <div className="no-results">No books found. Try a different title.</div>
        )}

        {books.length > 0 && (
          <div className="search-results">
            {books.map((book) => (
              <div key={book._id} className="book-card">
                <div className="book-cover">
                  <img src={book.image} alt={book.title} className="book-image" />
                </div>
                <div className="book-details">
                  <div className="book-title">{book.title}</div>
                  <div className="book-author">{book.author}</div>
                  <div className="book-price">₹{book.price}</div>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(book.title)} // ✅ Use title
                    disabled={addingToCart === book.title}
                  >
                    {addingToCart === book.title ? 'Adding...' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchPage;
