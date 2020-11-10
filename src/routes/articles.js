const router = require('express').Router();
const { articleController } = require('../controllers');

router.get('/', articleController.getArticles);
router.post('/', articleController.createArticle);
router.delete('/:articleId', articleController.deleteArticle);

module.exports = router;
