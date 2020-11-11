const router = require('express').Router();
const articlesRouter = require('./articles');
const authRouter = require('./auth');
const usersRouter = require('./users');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../types/errors');

const defaultRoute = (req, res, next) => next(new NotFoundError('default route'));

router.use(authRouter);
router.use('/articles', auth, articlesRouter);
router.use('/users', auth, usersRouter);
router.use(defaultRoute);

module.exports = router;
