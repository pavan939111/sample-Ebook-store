const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    genre: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL to book cover image
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

// Avoid model overwrite error in dev environments with hot reload
const BookModel = mongoose.models.Book || mongoose.model('Book', bookSchema);

module.exports = BookModel;
