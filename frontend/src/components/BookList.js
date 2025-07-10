import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import './BookList.css';

function BookList({ selectedGenre = 'All' }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null); // Track which book is being added

  // Fetch all books once
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://sample-ebook-store.onrender.com/api/books');
        if (!response.ok) throw new Error('Failed to fetch books');
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Could not load books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter books based on selectedGenre
  useEffect(() => {
    if (selectedGenre === 'All') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(
        (book) => book.genre?.toLowerCase() === selectedGenre.toLowerCase()
      );
      setFilteredBooks(filtered);
    }
  }, [selectedGenre, books]);

  // Handle Add to Cart
  const handleAddToCart = async (bookTitle) => {
    const username = localStorage.getItem('username');

    if (!username) {
      alert('Please log in to add books to cart!');
      return;
    }

    setAddingToCart(bookTitle);

    try {
      const response = await fetch('https://sample-ebook-store.onrender.com/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          bookId: bookTitle, // Backend expects title
        }),
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

  // Loading or error display
  if (loading) return <div className="book-area"><p>Loading books...</p></div>;
  if (error) return <div className="book-area"><p>{error}</p></div>;

  return (
    <div className="book-area">
      <h2>{selectedGenre === 'All' ? 'Top Rated Books' : `Books in ${selectedGenre}`}</h2>
      <div className="book-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard
              key={book._id}
              _id={book._id}
              title={book.title}
              author={book.author}
              description={book.description}
              genre={book.genre}
              price={book.price}
              image={book.image}
              onAddToCart={handleAddToCart}
              isAddingToCart={addingToCart === book.title}
            />
          ))
        ) : (
          <p>No books available in this genre.</p>
        )}
      </div>
    </div>
  );
}

export default BookList;
