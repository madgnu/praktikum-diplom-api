const HttpThrowableError = require('./httpthrowable');
const SecretNotFoundError = require('./secretnotfound');
const AuthorizationFailError = require('./authorizationfail');
const ForbiddenError = require('./forbidden');
const NotFoundError = require('./notfound');

module.exports = {
  HttpThrowableError,
  SecretNotFoundError,
  AuthorizationFailError,
  ForbiddenError,
  NotFoundError,
};
