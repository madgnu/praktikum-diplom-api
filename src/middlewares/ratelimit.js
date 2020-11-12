const rateLimit = require('express-rate-limit');
const vault = require('../modules/vault');

const limiterOptions = {
  windowMs: 60 * 1000,
  max: vault.getSecret('REQ_PER_MIN'),
};

module.exports = rateLimit(limiterOptions);
