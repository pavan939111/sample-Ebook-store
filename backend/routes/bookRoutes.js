const express = require('express');
const Book = require('../models/bookModel');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    console.error('Fetch Books Error:', err.message);
    res.status(500).json({ error: '❌ Failed to fetch books' });
  }
});

router.post('/addbook', async (req, res) => {
  const { title, author, description, price, genre, image } = req.body;

  if (!title || !author || !description || !price || !genre || !image) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newBook = new Book({ title, author, description, price, genre, image });
    await newBook.save();
    res.status(201).json({ message: '📘 Book added successfully' });
  } catch (err) {
    console.error('Add Book Error:', err.message);
    res.status(500).json({ error: '❌ Failed to add book' });
  }
});

router.get('/search', async (req, res) => {
  const { title } = req.query;

  try {
    const regex = new RegExp(title, 'i');
    const books = await Book.find({ title: regex });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search books' });
  }
});

module.exports = router;
