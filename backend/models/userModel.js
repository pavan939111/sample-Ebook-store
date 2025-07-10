const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',       // references the Book model
    },
  ],
});

module.exports = mongoose.model('User', userSchema);

