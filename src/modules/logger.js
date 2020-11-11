const winston = require('winston');
const expressWinston = require('express-winston');

const getFormater = (format) => {
  switch (format) {
    case 'json': return winston.format.json();
    case 'short': return winston.format.printf((info) => `${new Date().toISOString()} ${info.message}`);
    case 'logstash': return winston.format.logstash();
    default: return winston.format.json();
  }
};

const getTransport = (transportType, filename = 'combine.log', dirname = 'logs') => {
  switch (transportType) {
    case 'tty': return new winston.transports.Console();
    case 'file': return new winston.transports.File({ filename, dirname });
    default: return new winston.transports.Console();
  }
};

const getLogger = (loggerType) => {
  switch (loggerType) {
    case 'middlewareLogger': return expressWinston.logger;
    case 'middlewareErrorLogger': return expressWinston.errorLogger;
    case 'logger': return winston.createLogger;
    default: return winston.createLogger;
  }
};

module.exports = (options = {}) => {
  const {
    loggerType,
    format,
    transportType,
    filename,
    dirname,
    level = (process.env.NODE_ENV === 'production') ? 'error' : 'info',
  } = options;

  const logger = getLogger(loggerType);

  return logger({
    level,
    transports: [getTransport(transportType, filename, dirname)],
    format: getFormater(format),
    expressFormat: format === 'short',
  });
};
