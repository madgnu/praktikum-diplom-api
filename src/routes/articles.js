const router = require('express').Router();
const { celebrate } = require('celebrate');
const { articleController } = require('../controllers');
const { articlesHttpValidator } = require('../models/http');

router.get('/', articleController.getArticles);
router.post('/', celebrate(articlesHttpValidator.article), articleController.createArticle);
router.delete('/:articleId', celebrate(articlesHttpValidator.resource), articleController.deleteArticle);

module.exports = router;
