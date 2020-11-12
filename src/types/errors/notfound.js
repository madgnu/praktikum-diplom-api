const HttpThrowableError = require('./httpthrowable');
const { ERR_MESSAGE_NOT_FOUND } = require('../../consts').messages;

class NotFoundError extends HttpThrowableError {
  constructor(message) {
    super(message, 404, ERR_MESSAGE_NOT_FOUND);
  }
}

module.exports = NotFoundError;
