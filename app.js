const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserRouter = require('./routes/userRoutes');
require('dotenv').config();
const ArticleRouter = require('./routes/articleRoutes');

url=process.env.DB_HOST;
// Connect to MongoDB Atlas
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // Create Express app
    const app = express();

    // Middleware
    app.use(bodyParser.json());

    // Routes
    app.use('/api', UserRouter);
    app.use('/api', ArticleRouter);

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB Atlas', error);
  });
