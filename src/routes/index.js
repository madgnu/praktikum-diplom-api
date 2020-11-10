const router = require('express').Router();
const articlesRouter = require('./articles');
const authRouter = require('./auth');
const usersRouter = require('./users');

router.use(authRouter);
router.use('/articles', articlesRouter);
router.use('/users', usersRouter);

module.exports = router;
