const { Article } = require('../models/database');

module.exports.createArticle = async (req, res, next) => {
  try {
    const article = await Article.create(req.body);
    res.send(article);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const article = await Article.findById(articleId).orFail();
    await article.deleteOne();
    res.send(article);
  } catch (err) {
    next(err);
  }
};

module.exports.getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({});
    res.send(articles);
  } catch (err) {
    next(err);
  }
};
