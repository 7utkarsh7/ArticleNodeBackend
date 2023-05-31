const express = require('express');
const ArticleController = require('../controllers/articleController');
const { authenticateToken } = require('../utils/authMiddleware');
const router = express.Router();

const articleController = new ArticleController();

router.post('/users/:userId/articles',authenticateToken, articleController.createArticle.bind(articleController));
router.get('/articles',authenticateToken, articleController.getAllArticles.bind(articleController));

module.exports = router;
