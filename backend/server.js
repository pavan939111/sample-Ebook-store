



require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Setup CORS to allow Vercel frontend and localhost
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://sample-ebook-store.vercel.app' // ✅ Your actual frontend domain
  ],
  credentials: true,
}));

// ✅ Parse JSON requests
app.use(express.json());

// ✅ Register API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/cart', cartRoutes);

// ✅ Optional: Health check route
app.get('/', (req, res) => {
  res.send('📚 E-Book Store Backend is running...');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

