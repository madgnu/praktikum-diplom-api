const vaultConfigured = require('dotenv').config();

const { SecretNotFoundError } = require('../types/errors');

const secrets = process.env;

const devDefaults = {
  DB_URI: 'mongodb://localhost:27017/diploma',
  PORT: 3000,
  AUTH_STRATEGY: 'bearer',
  JWT_SECRET: 'non-secret',
  LOGS_FORMAT: 'json',
  LOGS_TYPE: 'file',
  LOGS_DIR: 'logs',
  REQ_PER_MIN: 100,
};

module.exports.init = () => !vaultConfigured.error || (process.env.NODE_ENV !== 'production');
module.exports.getSecret = (name) => {
  if (process.env.NODE_ENV === 'production' && !secrets[name]) throw new SecretNotFoundError(`Secret "${name}" not found in vault`);
  return secrets[name] || devDefaults[name];
};
