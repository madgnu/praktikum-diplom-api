const HttpThrowableError = require('./httpthrowable');

class ForbiddenError extends HttpThrowableError {
  constructor(message) {
    super(message, 403, 'У вас не хватает прав для этого действия');
  }
}

module.exports = ForbiddenError;
