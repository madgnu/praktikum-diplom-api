const jwt = require('jsonwebtoken');
const vault = require('../modules/vault');
const { User } = require('../models/database');
const { AuthorizationFailError } = require('../types/errors');

module.exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ ...user.toObject(), password: undefined });
  } catch (err) {
    next(err);
  }
};

module.exports.authenticate = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, vault.getSecret('JWT_SECRET'), { expiresIn: '7d' });

    const authStrategy = vault.getSecret('AUTH_STRATEGY');
    switch (authStrategy) {
      case 'bearer': res.send({ token }); break;
      case 'cookie': {
        res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true });
        res.send({ message: 'Authorized' });
        break;
      }
      default: throw new AuthorizationFailError('Unknown authorization strategy');
    }
  } catch (err) {
    next(err);
  }
};

module.exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.send(user);
  } catch (err) {
    next(err);
  }
};
