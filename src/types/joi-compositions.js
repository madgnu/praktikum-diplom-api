const { Joi } = require('celebrate');
const validator = require('validator');
const passwordRegexp = require('./regexp-password');

module.exports = {
  commonField: Joi.string().required(),
  url: Joi.string().required().custom((url, helpers) => {
    if (validator.isURL(url, { protocols: ['http', 'https'], require_protocol: true })) {
      return url;
    }
    return helpers.message('Wrong URL format');
  }, 'URL Link'),
  objectId: Joi.string().required().length(24).hex(),
  password: Joi.string().required().regex(passwordRegexp),
};
