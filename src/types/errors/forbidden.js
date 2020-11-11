const HttpThrowableError = require('./httpthrowable');
const { ERR_MESSAGE_FORBIDDEN } = require('../../consts').messages;

class ForbiddenError extends HttpThrowableError {
  constructor(message) {
    super(message, 403, ERR_MESSAGE_FORBIDDEN);
  }
}

module.exports = ForbiddenError;
