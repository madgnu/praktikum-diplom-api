const { Article } = require('../models/database');
const { ForbiddenError } = require('../types/errors');

module.exports.createArticle = async (req, res, next) => {
  try {
    const article = await Article.create({ ...req.body, owner: req.user._id });
    res.send(article);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.articleId).orFail();
    if (String(article.owner) !== req.user._id) throw new ForbiddenError('Owner mismatch');
    await article.deleteOne();
    res.send(article);
  } catch (err) {
    next(err);
  }
};

module.exports.getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ owner: req.user._id });
    res.send(articles);
  } catch (err) {
    next(err);
  }
};
