const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

url='mongodb+srv://Utkarsh:7utkarsh7@cluster0.8xwxgym.mongodb.net/?retryWrites=true&w=majority';
// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // Start your server or perform other operations
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB Atlas:', error);
  });


// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

// Article Schema
const articleSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Article = mongoose.model('Article', articleSchema);

// Signup API
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, name, age } = req.body;

    // Validate request inputs
    if (!email || !password || !name || !age) {
      return res.status(400).json({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Missing required fields',
      });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        statusCode: 409,
        error: 'Conflict',
        message: 'Email already registered',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ email, password: hashedPassword, name, age });
    await user.save();

    return res.json({
      statusCode: 200,
      data: { user },
      message: 'User created successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An error occurred while processing the request',
    });
  }
});

// Login API
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request inputs
    if (!email || !password) {
      return res.status(400).json({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Missing required fields',
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Invalid email or password',
      });
    }

    // Check the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Invalid email or password',
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });

    return res.json({
      statusCode: 200,
      data: { token },
      message: 'Login successful',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An error occured'
    });
}
});

// Create Article API
app.post('/api/users/:userId/articles', async (req, res) => {
    try {
      const { userId } = req.params;
      const { title, description } = req.body;
  
      // Validate request inputs
      if (!title || !description) {
        return res.status(400).json({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Missing required fields',
        });
      }
  
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          statusCode: 404,
          error: 'Not Found',
          message: 'User not found',
        });
      }
  
      // Create a new article
      const article = new Article({ title, description, author: user._id });
      await article.save();
  
      return res.json({
        statusCode: 200,
        data: { article },
        message: 'Article created successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        statusCode: 500,
        error: 'Internal Server Error',
        message: 'An error occurred while processing the request',
      });
    }
  });
  
  // Get All Articles API
  app.get('/api/articles', async (req, res) => {
    try {
      // Fetch all articles with the author details
      const articles = await Article.find().populate('author', 'name age');
  
      return res.json({
        statusCode: 200,
        data: { articles },
        message: 'Articles retrieved successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        statusCode: 500,
        error: 'Internal Server Error',
        message: 'An error occurred while processing the request',
      });
    }
  });
  
  // Update User Profile API
  app.patch('/api/users/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { name, age } = req.body;
  
      // Validate request inputs
      if (!name || !age) {
        return res.status(400).json({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Missing required fields',
        });
      }
  
      // Update the user profile
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, age },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({
          statusCode: 404,
          error: 'Not Found',
          message: 'User not found',
        });
      }
  
      return res.json({
        statusCode: 200,
        data: { user: updatedUser },
        message: 'User profile updated successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        statusCode: 500,
        error: 'Internal Server Error',
        message: 'An error occurred while processing the request',
      });
    }
  });
  
  // Start the server
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  