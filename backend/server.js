// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const User = require('./models/userModel'); // ✅ Correct model reference
// const Book = require('./models/bookModel');
// const CartItem = require('./models/CartItem'); // ✅ New model for cart


// const app = express();
// app.use(cors());
// app.use(express.json());

// // 🔌 MongoDB Connection
// mongoose.connect('mongodb://127.0.0.1:27017/bookstoreDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('✅ MongoDB connected'))
// .catch((err) => console.error('❌ MongoDB connection error:', err));





// // 📝 Register Route
// app.post('/register', async (req, res) => {
//   const { fullName, email, username, password } = req.body;

//   if (!fullName || !email || !username || !password) {
//     return res.status(400).json({ error: 'Please fill all fields' });
//   }

//   try {
//     const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//     if (existingUser) {
//       return res.status(409).json({ error: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({ fullName, email, username, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error('Register Error:', err.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// // GET user by username

// app.get('/user/:username', async (req, res) => {
//   try {
//     const { username } = req.params;
//     const user = await User.findOne({ username });

//     if (!user) return res.status(404).json({ error: 'User not found' });

//     res.json({
//       fullName: user.fullName,
//       email: user.email,
//       username: user.username
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });



// // 🔐 Login Route
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Find user by username
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Compare password hash
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // ✅ Send success response with userId & username
//     res.status(200).json({
//       message: 'Login successful',
//       userId: user._id,
//       username: user.username, // include username for convenience
//     });
//   } catch (err) {
//     console.error('Login Error:', err.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });



// app.get('/books', async (req, res) => {
//   try {
//     const books = await Book.find(); // fetch all books
//     res.status(200).json(books);     // respond with books as JSON
//   } catch (err) {
//     console.error('Fetch Books Error:', err.message);
//     res.status(500).json({ error: '❌ Failed to fetch books' });
//   }
// });
// /// 📚 Add Book Route
// app.post('/addbook', async (req, res) => {
//   try {
//     const { title, author, description, price, genre, image } = req.body;

//     // Validate required fields
//     if (!title || !author || !description || !price || !genre || !image) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }

//     const newBook = new Book({ title, author, description, price, genre, image });
//     await newBook.save();

//     res.status(201).json({ message: '📘 Book added successfully' });
//   } catch (err) {
//     console.error('Add Book Error:', err.message);
//     res.status(500).json({ error: '❌ Failed to add book' });
//   }
// });








// app.post('/api/cart/add', async (req, res) => {
//   const { username, bookId } = req.body;

//   console.log('📥 Request received - username:', username, 'bookId (title):', bookId);

//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       console.log('❌ User not found');
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const book = await Book.findOne({ title: bookId }); // since we're using title now
//     if (!book) {
//       console.log('❌ Book not found');
//       return res.status(404).json({ error: 'Book not found' });
//     }

//     let cartItem = await CartItem.findOne({ userId: user._id, bookId: book._id });

//     if (cartItem) {
//       cartItem.quantity += 1;
//       await cartItem.save();
//       console.log('🔁 Quantity increased');
//     } else {
//       cartItem = new CartItem({ userId: user._id, bookId: book._id });
//       await cartItem.save();
//       console.log('🆕 New item added');
//     }

//     res.status(200).json({ message: '✅ Book added to cart', cartItem });
//   } catch (err) {
//     console.error('💥 Add to Cart Error:', err);
//     res.status(500).json({ error: '❌ Failed to add to cart' });
//   }
// });


// app.get('/api/cart/:username', async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.params.username });
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     const cart = await CartItem.find({ userId: user._id }).populate('bookId');

//     res.status(200).json(cart);
//   } catch (err) {
//     console.error('Fetch Cart Error:', err.message);
//     res.status(500).json({ error: '❌ Failed to fetch cart' });
//   }
// });


// app.delete('/api/cart/:username/remove/:bookId', async (req, res) => {
//   const { username, bookId } = req.params;

//   try {
//     const user = await User.findOne({ username });
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     await CartItem.deleteOne({ userId: user._id, bookId });

//     res.status(200).json({ message: '❌ Book removed from cart' });
//   } catch (err) {
//     console.error('Remove Cart Item Error:', err.message);
//     res.status(500).json({ error: '❌ Failed to remove item from cart' });
//   }
// });

// app.get('/api/books/search', async (req, res) => {
//   const { title } = req.query;

//   try {
//     const regex = new RegExp(title, 'i'); // case-insensitive search
//     const books = await Book.find({ title: regex });
//     res.json(books);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to search books' });
//   }
// });

// // 🚀 Start the Server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });


    require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const cartRoutes = require('./routes/cartRoutes');



const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/cart', cartRoutes);

// console.log('🧪 MONGO_URI:', process.env.MONGO_URI);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
