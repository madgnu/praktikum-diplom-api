const devDefaults = {
  DB_URI: 'mongodb://localhost:27017/db',
  PORT: 3000,
  AUTH_STRATEGY: 'bearer',
  JWT_SECRET: 'non-secret',
  LOGS_FORMAT: 'json',
  LOGS_TYPE: 'file',
  LOGS_DIR: 'logs',
  REQ_PER_MIN: 100,
};

module.exports = {
  devDefaults,
};
