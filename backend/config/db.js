// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb://127.0.0.1:27017/bookstoreDB', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('✅ MongoDB connected');
//   } catch (err) {
//     console.error('❌ MongoDB connection error:', err);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

// // mongodb+srv://b210074:<db_password>@cluster-1.uz5eujr.mongodb.net/
//   mongodb+srv://b210074:<db_password>@cluster-1.uz5eujr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB Atlas connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

