const mongoose = require('mongoose');
const { CelebrateError } = require('celebrate');
const { HttpThrowableError } = require('../types/errors');
const {
  ERR_MESSAGE_ALREADY_EXISTS,
  ERR_MESSAGE_NOT_AUTH,
  ERR_MESSAGE_NOT_FOUND,
  ERR_MESSAGE_UNKNOWN,
  ERR_MESSAGE_VALIDATION,
} = require('../consts').messages;

const genResponseObject = (env, err) => {
  const errObj = {
    message: ERR_MESSAGE_UNKNOWN,
  };

  if (env === 'dev') {
    errObj.devData = {
      error: err.toString(),
      message: err.message,
      stack: err.stack,
    };
  }
  return errObj;
};

const getCelebrateViolations = (err) => {
  const violations = {};
  err.details.forEach((el, name) => {
    violations[name] = el.details.map((joiErr) => joiErr.path.join('.'));
  });
  return violations;
};

module.exports = (env) => (err, req, res, next) => {
  let responseCode = 500;
  const errObj = genResponseObject(env, err);

  if (err instanceof HttpThrowableError) {
    responseCode = err.statusCode;
    errObj.message = err.publicOutput;
  } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
    responseCode = 404;
    errObj.message = ERR_MESSAGE_NOT_FOUND;
  } else if (err instanceof CelebrateError) {
    responseCode = 400;
    errObj.message = ERR_MESSAGE_VALIDATION;
    errObj.violations = getCelebrateViolations(err);
  } else if (err.name === 'MongoError' && err.code === 11000) {
    responseCode = 409;
    errObj.message = ERR_MESSAGE_ALREADY_EXISTS;
  } else if (err.name === 'JsonWebTokenError') {
    responseCode = 401;
    errObj.message = ERR_MESSAGE_NOT_AUTH;
  }

  res.status(responseCode).send(errObj);
  next();
};
