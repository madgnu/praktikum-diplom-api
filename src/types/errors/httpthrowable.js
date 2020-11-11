const { ERR_MESSAGE_UNKNOWN } = require('../../consts').messages;

class HttpThrowableError extends Error {
  constructor(message, statusCode = 500, publicOutput = ERR_MESSAGE_UNKNOWN) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.publicOutput = publicOutput;
  }
}

module.exports = HttpThrowableError;
