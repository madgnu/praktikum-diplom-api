const vaultConfigured = require('dotenv').config();

const { SecretNotFoundError } = require('../types/errors');

const secrets = process.env;

const devDefaults = {
  MONGODB_URI: 'mongodb://localhost:27017/diploma',
  PORT: 3000,
  AUTH_STRATEGY: 'bearer',
  JWT_SECRET: 'non-secret',
};

module.exports.init = () => !vaultConfigured.error || (process.env.NODE_ENV !== 'production');
module.exports.getSecret = (name) => {
  if (process.env.NODE_ENV === 'production' && !secrets[name]) throw new SecretNotFoundError(`Secret "${name}" not found in vault`);
  return secrets[name] || devDefaults[name];
};
