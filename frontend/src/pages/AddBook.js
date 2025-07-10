import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // ✅ Add this
import './AddBook.css';

function AddBook() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    genre: '',
    image: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/books/addbook', formData); // ✅ Updated route
      alert(res.data.message || "Book added!");
      setFormData({ title: '', author: '', description: '', price: '', genre: '', image: '' });
      navigate('/home');
    } catch (error) {
      alert(error.response?.data?.error || "Error adding book");
    }
  };

  return (
    <>
      <Navbar />
      <div className="add-book-container">
        <h2 className="add-book-title">Add a New Book 📚</h2>
        <form onSubmit={handleSubmit} className="add-book-form">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <input
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Genre"
            required
          />
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
          />
          <button type="submit" className="submit-btn">Add Book</button>
        </form>
      </div>
    </>
  );
}

export default AddBook;
