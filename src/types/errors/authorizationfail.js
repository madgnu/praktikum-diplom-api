const HttpThrowableError = require('./httpthrowable');
const { ERR_MESSAGE_NOT_AUTH } = require('../../consts').messages;

class AuthorizationFailError extends HttpThrowableError {
  constructor(message) {
    super(message, 401, ERR_MESSAGE_NOT_AUTH);
  }
}

module.exports = AuthorizationFailError;
