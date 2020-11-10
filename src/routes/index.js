const router = require('express').Router();
const articlesRouter = require('./articles');
const authRouter = require('./auth');
const usersRouter = require('./users');
const auth = require('../middlewares/auth');

router.use(authRouter);
router.use('/articles', auth, articlesRouter);
router.use('/users', auth, usersRouter);

module.exports = router;
