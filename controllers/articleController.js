const ArticleService = require('../services/articleService');
const Response = require('../utils/response');

class ArticleController {
  constructor() {
    this.articleService = new ArticleService();
  }

  async createArticle(req, res) {
    const { title, description } = req.body;
    const { userId } = req.params;
    try {
      if (!userId || !title || !description ) {
        const response = new Response(400, null,'Missing required fields (userid/title/description)' );
        res.json(response);
       }else{
        const article =await this.articleService.createArticle(userId, title, description);
        const response = new Response(201, article,false,'Article posted successfully');
        res.json(response);
       }
     
    } catch (error) {
      const response = new Response(500, null, error.message);
      res.json(response);
    }
  }

  async getAllArticles(req, res)  {
    try {
      const articles = await this.articleService.getAllArticles();
      if (articles.length === 0) {
        const response = new Response(204, null,false,'No articles found');
        res.json(response);
      }else{
        const response = new Response(200, articles,false,'Article fetched successfully');
      res.json(response);
      }  
      
    } catch (error) {
      const response = new Response(500, null, error.message);
      res.json(response);
    }
  }
}

module.exports = ArticleController;
