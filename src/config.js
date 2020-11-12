module.exports.defaults = {
  dev: {
    DB_URI: 'mongodb://localhost:27017/db',
    PORT: 3000,
    JWT_SECRET: 'non-secret',
    AUTH_STRATEGY: 'bearer',
    LOGS_FORMAT: 'json',
    LOGS_TYPE: 'file',
    LOGS_DIR: 'logs',
    REQ_PER_MIN: 1000,
  },
  production: {
    AUTH_STRATEGY: 'bearer',
    LOGS_FORMAT: 'json',
    LOGS_TYPE: 'file',
    LOGS_DIR: 'logs',
    REQ_PER_MIN: 100,
  },
};
