import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Catalogue.css';
import Navbar from '../components/Navbar'; // ✅ Import Navbar

const Catalogue = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingItem, setRemovingItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');

    if (!username) {
      alert('Please log in to view your cart!');
      navigate('/login');
      return;
    }

    fetchCartItems(username);
  }, [navigate]);

  const fetchCartItems = async (username) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/cart/${username}`);

      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }

      const data = await response.json();
      setCartItems(data);
    } catch (err) {
      console.error('Fetch cart error:', err);
      setError('Failed to load cart items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (bookId) => {
    const username = localStorage.getItem('username');

    if (!username) {
      alert('Please log in first!');
      return;
    }

    setRemovingItem(bookId);

    try {
      const response = await fetch(`http://localhost:5000/api/cart/${username}/remove/${bookId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        setCartItems(prevItems => prevItems.filter(item => item.bookId._id !== bookId));
        alert('✅ Book removed from cart successfully!');
      } else {
        alert(`❌ ${data.error || 'Failed to remove book from cart'}`);
      }
    } catch (err) {
      console.error('Remove from cart error:', err);
      alert('❌ Failed to remove book from cart. Please try again.');
    } finally {
      setRemovingItem(null);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.bookId.price * item.quantity), 0);
  };

  return (
    <>
      <Navbar /> {/* ✅ Fixed Navbar */}
      <div className="catalogue-container">
        <h2 className="catalogue-title">🛒 Your Book Cart</h2>

        {loading ? (
          <p>Loading your cart...</p>
        ) : error ? (
          <div className="error-section">
            <p className="error-message">{error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <button onClick={() => navigate('/home')} className="continue-shopping-btn">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-summary">
              <p><strong>Total Items:</strong> {cartItems.length}</p>
              <p><strong>Total Amount:</strong> ₹{calculateTotal()}</p>
            </div>

            <div className="book-list">
              {cartItems.map(item => (
                <div key={item._id} className="book-item">
                  <div className="book-info">
                    <img
                      src={item.bookId.image}
                      alt={item.bookId.title}
                      className="book-thumbnail"
                    />
                    <div className="book-details">
                      <h4>{item.bookId.title}</h4>
                      <p><strong>Author:</strong> {item.bookId.author}</p>
                      <p><strong>Genre:</strong> {item.bookId.genre}</p>
                      <p><strong>Price:</strong> ₹{item.bookId.price}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Subtotal:</strong> ₹{item.bookId.price * item.quantity}</p>
                    </div>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item.bookId._id)}
                    disabled={removingItem === item.bookId._id}
                  >
                    {removingItem === item.bookId._id ? '⏳ Removing...' : '❌ Remove'}
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <button onClick={() => navigate('/home')} className="continue-shopping-btn">
                Continue Shopping
              </button>
              <button className="checkout-btn">
                Proceed to Checkout (₹{calculateTotal()})
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Catalogue;
