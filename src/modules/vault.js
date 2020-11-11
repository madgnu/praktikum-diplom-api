const vaultConfigured = require('dotenv').config();
const { SecretNotFoundError } = require('../types/errors');
const { defaults } = require('../config');

const secrets = process.env;

module.exports.init = () => !vaultConfigured.error || (process.env.NODE_ENV !== 'production');
module.exports.getSecret = (name) => {
  const secret = secrets[name] || defaults[process.env.NODE_ENV][name];
  if (process.env.NODE_ENV === 'production' && !secret) throw new SecretNotFoundError(`Secret "${name}" not found in vault`);
  return secret;
};
