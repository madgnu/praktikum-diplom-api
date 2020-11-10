const router = require('express').Router();
const { userController } = require('../controllers');

router.get('/me', userController.getMe);

module.exports = router;
