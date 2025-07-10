// const mongoose = require('mongoose');
// const Book = require('./models/bookModel');

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/bookstoreDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('📦 Connected to MongoDB...');
//   insertFakeBooks();
// }).catch((err) => {
//   console.error('❌ DB connection failed:', err);
// });

// // Updated sample book data with authors
// const sampleBooks = [
//   {
//     title: 'Atomic Habits',
//     author: 'James Clear',
//     description: 'A practical guide to building good habits and breaking bad ones with proven strategies.',
//     price: 499,
//     genre: 'Self-Help',
//     image: 'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg',
//   },
//   {
//     title: 'The Alchemist',
//     author: 'Paulo Coelho',
//     description: 'An inspiring tale of a shepherd boy’s journey to discover his destiny and personal legend.',
//     price: 350,
//     genre: 'Fiction',
//     image: 'https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg',
//   },
//   {
//     title: 'Rich Dad Poor Dad',
//     author: 'Robert Kiyosaki',
//     description: 'Timeless personal finance advice from two father figures with vastly different perspectives.',
//     price: 399,
//     genre: 'Finance',
//     image: 'https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg',
//   },
//   {
//     title: 'Ikigai',
//     author: 'Héctor García & Francesc Miralles',
//     description: 'Explores the Japanese philosophy of finding purpose, leading to a long and meaningful life.',
//     price: 299,
//     genre: 'Lifestyle',
//     image: 'https://m.media-amazon.com/images/I/814L+vq01mL.jpg',
//   },
//   {
//     title: 'Sapiens: A Brief History of Humankind',
//     author: 'Yuval Noah Harari',
//     description: 'An engaging exploration of humanity’s evolution from ancient times to the modern world.',
//     price: 550,
//     genre: 'History',
//     image: 'https://m.media-amazon.com/images/I/713jIoMO3UL.jpg',
//   },
//   {
//     title: '1984',
//     author: 'George Orwell',
//     description: 'A dystopian novel about surveillance, totalitarianism, and the power of oppressive regimes.',
//     price: 320,
//     genre: 'Dystopian Fiction',
//     image: 'https://m.media-amazon.com/images/I/71kxa1-0zfL.jpg',
//   },
//   {
//     title: 'Think Like a Monk',
//     author: 'Jay Shetty',
//     description: 'A practical guide for finding peace and purpose, inspired by timeless monastic wisdom.',
//     price: 450,
//     genre: 'Self-Help',
//     image: 'https://m.media-amazon.com/images/I/81IY5+62VvL.jpg',
//   }
// ];

// // Insert into DB
// async function insertFakeBooks() {
//   try {
//     await Book.deleteMany(); // clear existing books
//     await Book.insertMany(sampleBooks);
//     console.log('✅ Fake book data inserted successfully.');
//     process.exit();
//   } catch (err) {
//     console.error('❌ Failed to insert books:', err);
//     process.exit(1);
//   }
// }






const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/bookModel');

// Load .env variables
dotenv.config();

// MongoDB connection using Atlas URI
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('📦 Connected to MongoDB Atlas...');
    insertFakeBooks();
  })
  .catch((err) => {
    console.error('❌ DB connection failed:', err);
    process.exit(1);
  });

// Book sample data
const sampleBooks = [
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'A practical guide to building good habits and breaking bad ones.',
    price: 499,
    genre: 'Self-Help',
    image: 'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    description: 'A young shepherd boy’s journey to discover his personal legend.',
    price: 350,
    genre: 'Fiction',
    image: 'https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg',
  },
  {
    title: 'Rich Dad Poor Dad',
    author: 'Robert Kiyosaki',
    description: 'Learn the principles of financial independence from two father figures.',
    price: 399,
    genre: 'Finance',
    image: 'https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg',
  },
  {
    title: 'Ikigai',
    author: 'Héctor García & Francesc Miralles',
    description: 'The Japanese secret to a long and happy life.',
    price: 299,
    genre: 'Lifestyle',
    image: 'https://m.media-amazon.com/images/I/814L+vq01mL.jpg',
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    description: 'A brief history of humankind from ancient times to modern era.',
    price: 550,
    genre: 'History',
    image: 'https://m.media-amazon.com/images/I/713jIoMO3UL.jpg',
  },
  {
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian future ruled by surveillance and tyranny.',
    price: 320,
    genre: 'Dystopian Fiction',
    image: 'https://m.media-amazon.com/images/I/71kxa1-0zfL.jpg',
  },
  {
    title: 'Think Like a Monk',
    author: 'Jay Shetty',
    description: 'Train your mind for peace and purpose with ancient monk wisdom.',
    price: 450,
    genre: 'Self-Help',
    image: 'https://m.media-amazon.com/images/I/81IY5+62VvL.jpg',
  },
  {
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    description: 'Timeless lessons on wealth, greed, and happiness.',
    price: 499,
    genre: 'Finance',
    image: 'https://m.media-amazon.com/images/I/71g2ednj0JL.jpg',
  },
  {
    title: 'Man\'s Search for Meaning',
    author: 'Viktor E. Frankl',
    description: 'A Holocaust survivor’s story and his discovery of purpose.',
    price: 375,
    genre: 'Philosophy',
    image: 'https://m.media-amazon.com/images/I/61zXK0pK9cL.jpg',
  },
  {
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    description: 'A guide to spiritual awakening and mindfulness in the present moment.',
    price: 420,
    genre: 'Spirituality',
    image: 'https://m.media-amazon.com/images/I/71G45NWz13L.jpg',
  },

    {
    
    title: 'Deep Work',
    author: 'Cal Newport',
    description: 'An insightful book on Self-Help, packed with lessons and strategies.',
    price: 525,
    genre: 'Self-Help',
    image: 'https://covers.openlibrary.org/b/id/8675309-L.jpg',
  },
  {
    title: 'Start With Why',
    author: 'Simon Sinek',
    description: 'An insightful book on Motivation, packed with lessons and strategies.',
    price: 417,
    genre: 'Motivation',
    image: 'https://covers.openlibrary.org/b/id/8675310-L.jpg',
  },
  {
    title: 'Digital Minimalism',
    author: 'Mark Manson',
    description: 'An insightful book on Biography, packed with lessons and strategies.',
    price: 475,
    genre: 'Biography',
    image: 'https://covers.openlibrary.org/b/id/8675311-L.jpg',
  },
  {
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'David Goggins',
    description: 'An insightful book on Psychology, packed with lessons and strategies.',
    price: 490,
    genre: 'Psychology',
    image: 'https://covers.openlibrary.org/b/id/8675312-L.jpg',
  },
  {
    title: 'Can’t Hurt Me',
    author: 'Angela Duckworth',
    description: 'An insightful book on Business, packed with lessons and strategies.',
    price: 444,
    genre: 'Business',
    image: 'https://covers.openlibrary.org/b/id/8675313-L.jpg',
  },
  {
    title: 'Grit',
    author: 'Eric Ries',
    description: 'An insightful book on Productivity, packed with lessons and strategies.',
    price: 438,
    genre: 'Productivity',
    image: 'https://covers.openlibrary.org/b/id/8675314-L.jpg',
  },
  {
    title: 'The Lean Startup',
    author: 'Peter Thiel',
    description: 'An insightful book on Creativity, packed with lessons and strategies.',
    price: 335,
    genre: 'Creativity',
    image: 'https://covers.openlibrary.org/b/id/8675315-L.jpg',
  },
  {
    title: 'Zero to One',
    author: 'Tara Westover',
    description: 'An insightful book on Leadership, packed with lessons and strategies.',
    price: 466,
    genre: 'Leadership',
    image: 'https://covers.openlibrary.org/b/id/8675316-L.jpg',
  },
  {
    title: 'Educated',
    author: 'Michelle Obama',
    description: 'An insightful book on Philosophy, packed with lessons and strategies.',
    price: 451,
    genre: 'Philosophy',
    image: 'https://covers.openlibrary.org/b/id/8675317-L.jpg',
  },
  {
    title: 'Becoming',
    author: 'Trevor Noah',
    description: 'An insightful book on Self-Help, packed with lessons and strategies.',
    price: 521,
    genre: 'Self-Help',
    image: 'https://covers.openlibrary.org/b/id/8675318-L.jpg',
  },
  {
    title: 'Born a Crime',
    author: 'Malcolm Gladwell',
    description: 'An insightful book on Motivation, packed with lessons and strategies.',
    price: 319,
    genre: 'Motivation',
    image: 'https://covers.openlibrary.org/b/id/8675319-L.jpg',
  },
  {
    title: 'Outliers',
    author: 'Daniel Pink',
    description: 'An insightful book on Biography, packed with lessons and strategies.',
    price: 327,
    genre: 'Biography',
    image: 'https://covers.openlibrary.org/b/id/8675320-L.jpg',
  },
  {
    title: 'The Tipping Point',
    author: 'Nir Eyal',
    description: 'An insightful book on Psychology, packed with lessons and strategies.',
    price: 490,
    genre: 'Psychology',
    image: 'https://covers.openlibrary.org/b/id/8675321-L.jpg',
  },
  {
    title: 'Drive',
    author: 'Jake Knapp',
    description: 'An insightful book on Business, packed with lessons and strategies.',
    price: 372,
    genre: 'Business',
    image: 'https://covers.openlibrary.org/b/id/8675322-L.jpg',
  },
  {
    title: 'Hooked',
    author: 'Austin Kleon',
    description: 'An insightful book on Productivity, packed with lessons and strategies.',
    price: 585,
    genre: 'Productivity',
    image: 'https://covers.openlibrary.org/b/id/8675323-L.jpg',
  },
  {
    title: 'Make Time',
    author: 'Robert Greene',
    description: 'An insightful book on Creativity, packed with lessons and strategies.',
    price: 597,
    genre: 'Creativity',
    image: 'https://covers.openlibrary.org/b/id/8675324-L.jpg',
  },
  {
    title: 'Steal Like an Artist',
    author: 'Carol Dweck',
    description: 'An insightful book on Leadership, packed with lessons and strategies.',
    price: 517,
    genre: 'Leadership',
    image: 'https://covers.openlibrary.org/b/id/8675325-L.jpg',
  },
  {
    title: 'Show Your Work',
    author: 'Cal Newport',
    description: 'An insightful book on Philosophy, packed with lessons and strategies.',
    price: 383,
    genre: 'Philosophy',
    image: 'https://covers.openlibrary.org/b/id/8675326-L.jpg',
  },
  {
    title: 'Mastery',
    author: 'Simon Sinek',
    description: 'An insightful book on Self-Help, packed with lessons and strategies.',
    price: 329,
    genre: 'Self-Help',
    image: 'https://covers.openlibrary.org/b/id/8675327-L.jpg',
  },
  {
    title: 'Mindset',
    author: 'Mark Manson',
    description: 'An insightful book on Motivation, packed with lessons and strategies.',
    price: 429,
    genre: 'Motivation',
    image: 'https://covers.openlibrary.org/b/id/8675328-L.jpg',
  }

];

// Insert into DB
async function insertFakeBooks() {
  try {
    await Book.deleteMany(); // Clear existing books
    await Book.insertMany(sampleBooks);
    console.log('✅ Sample book data inserted successfully.');
    process.exit();
  } catch (err) {
    console.error('❌ Failed to insert books:', err);
    process.exit(1);
  }
}
