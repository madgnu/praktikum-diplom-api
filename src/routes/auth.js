const router = require('express').Router();
const { userController } = require('../controllers');

router.post('/signin', userController.authenticate);
router.post('/signup', userController.createUser);

module.exports = router;
