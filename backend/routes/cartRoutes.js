const express = require('express');
const CartItem = require('../models/CartItem');
const User = require('../models/userModel');
const Book = require('../models/bookModel');

const router = express.Router();

router.post('/add', async (req, res) => {
  const { username, bookId } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const book = await Book.findOne({ title: bookId });
    if (!book) return res.status(404).json({ error: 'Book not found' });

    let cartItem = await CartItem.findOne({ userId: user._id, bookId: book._id });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = new CartItem({ userId: user._id, bookId: book._id });
      await cartItem.save();
    }

    res.status(200).json({ message: '✅ Book added to cart', cartItem });
  } catch (err) {
    console.error('💥 Add to Cart Error:', err);
    res.status(500).json({ error: '❌ Failed to add to cart' });
  }
});

router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const cart = await CartItem.find({ userId: user._id }).populate('bookId');
    res.status(200).json(cart);
  } catch (err) {
    console.error('Fetch Cart Error:', err.message);
    res.status(500).json({ error: '❌ Failed to fetch cart' });
  }
});

router.delete('/:username/remove/:bookId', async (req, res) => {
  const { username, bookId } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    await CartItem.deleteOne({ userId: user._id, bookId });
    res.status(200).json({ message: '❌ Book removed from cart' });
  } catch (err) {
    console.error('Remove Cart Item Error:', err.message);
    res.status(500).json({ error: '❌ Failed to remove item from cart' });
  }
});

module.exports = router;
