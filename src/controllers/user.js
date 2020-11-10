const { User } = require('../models/database');

module.exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.authenticate = async (req, res, next) => {
  try {
    res.send('OK');
  } catch (err) {
    next(err);
  }
};

module.exports.getMe = async (req, res, next) => {
  try {
    res.send('OK');
  } catch (err) {
    next(err);
  }
};
