const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 2. Initialize the app
const app = express();
const PORT = 3001;
const JWT_SECRET = 'a-very-secret-key-that-you-should-change';

// 3. Set up middleware (MUST come before routes)
app.use(cors()); // Allows our frontend to make requests
app.use(express.json()); // Allows server to read JSON data from requests

// 4. --- MONGOOSE SCHEMAS ---

// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
});
const Product = mongoose.model('Product', productSchema);

// User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

// This "middleware" hashes the password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10); 
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
const User = mongoose.model('User', userSchema);
// ------------------------

// 5. --- DATABASE SEEDING (Run once) ---

// --- ADDED THIS ARRAY (for the seed function) ---
const products = [
  { name: 'Basic T-Shirt', price: 15.00, image: 'images/tshirt.jpg' },
  { name: 'Cool Jeans', price: 45.00, image: 'images/jeans.jpg' },
  { name: 'Stylish Hat', price: 25.00, image: 'images/hat.jpg' },
  { name: 'Running Shoes', price: 50.00, image: 'images/shoes.jpg' },
  { name: 'Backpack', price: 30.00, image: 'images/backpack.jpg' }
];

// This one-time "seed" function adds mock data to the DB if it's empty
Product.countDocuments()
  .then(count => {
    if (count === 0) {
      console.log('No products found. Seeding database...');
      Product.insertMany(products)
        .then(() => console.log('Database seeded successfully!'))
        .catch(err => console.error('Error seeding database:', err));
    }
  });
// ------------------------

// 6. --- API ROUTES ---

// --- Product Routes ---
app.get('/api/products', async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.json(allProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Auth Routes ---

// --- ADDED THIS MISSING ROUTE ---
// API ENDPOINT: User Registration (Sign Up)
app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        // 2. Create a new user (the 'pre-save' hook will hash the password)
        const newUser = new User({ email, password });
        await newUser.save();

        // 3. Send a success response
        res.status(201).json({ message: 'User created successfully!' });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});
// ---------------------------------

// API ENDPOINT: User Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // 2. Compare the typed password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // 3. If they match, create a "Digital ID Card" (Token)
        const token = jwt.sign(
            { userId: user._id, email: user.email }, // The "payload"
            JWT_SECRET,                             // The secret key
            { expiresIn: '1h' }                     // Expiration
        );

        // 4. Send the card to the user
        res.status(200).json({ message: 'Login successful!', token: token });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});
// ------------------------

// 7. --- DATABASE CONNECTION & SERVER START ---
const DB_URI = 'mongodb+srv://manoj:eQGDae7oyi60XG2a@cluster0.zeoeiwj.mongodb.net/?appName=Cluster0';

console.log('Connecting to database...');
mongoose.connect(DB_URI)
  .then(() => {
    console.log('Connected to MongoDB!');
    
    // Start the server ONLY after a successful DB connection
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Database connection error:', error);
  });