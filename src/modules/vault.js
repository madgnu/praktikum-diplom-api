const vaultConfigured = require('dotenv').config();
const { SecretNotFoundError } = require('../types/errors');
const { devDefaults } = require('../config');

const secrets = process.env;

module.exports.init = () => !vaultConfigured.error || (process.env.NODE_ENV !== 'production');
module.exports.getSecret = (name) => {
  if (process.env.NODE_ENV === 'production' && !secrets[name]) throw new SecretNotFoundError(`Secret "${name}" not found in vault`);
  return secrets[name] || devDefaults[name];
};
