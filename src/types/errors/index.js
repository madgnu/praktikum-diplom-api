const HttpThrowableError = require('./httpthrowable');
const SecretNotFoundError = require('./secretnotfound');
const AuthorizationFailError = require('./authorizationfail');
const ForbiddenError = require('./forbidden');

module.exports = {
  HttpThrowableError,
  SecretNotFoundError,
  AuthorizationFailError,
  ForbiddenError,
};
