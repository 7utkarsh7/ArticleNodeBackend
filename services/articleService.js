const Article = require('../models/article');
const Response = require('../utils/response');

class ArticleService {
  async createArticle(userId, title, description) {
    const article = new Article({ title, description, author: userId });
    await article.save();
    return article;
  }

  async getAllArticles() {
    const articles = await Article.find().populate('author', 'name');
    return articles;
  }
}

module.exports = ArticleService;
