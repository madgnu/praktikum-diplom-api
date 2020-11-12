const router = require('express').Router();
const { celebrate } = require('celebrate');
const { userController } = require('../controllers');
const { usersHttpValidator } = require('../models/http');

router.post('/signin', celebrate(usersHttpValidator.credentials), userController.authenticate);
router.post('/signup', celebrate(usersHttpValidator.user), userController.createUser);

module.exports = router;
