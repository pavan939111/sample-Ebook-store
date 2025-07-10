import React from 'react';
import './BookCard.css';

function BookCard({ _id, title, author, description, genre, price, image, onAddToCart, isAddingToCart }) {
  return (
    <div className="book-card">
      <img src={image} alt={title} className="book-cover" />

      <div className="book-details">
        <h4 className="book-title">{title}</h4>
        <p className="book-author"><strong>Author:</strong> {author}</p>
        <p className="book-genre"><strong>Genre:</strong> {genre}</p>
        <p className="book-price"><strong>Price:</strong> ₹{price}</p>
        <p className="book-description">{description}</p>

        <button
          className="add-to-cart-btn"
          onClick={() => onAddToCart && onAddToCart(title)}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? '⏳ Adding...' : '🛒 Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default BookCard;
