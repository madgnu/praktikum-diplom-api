const { Joi } = require('celebrate');
const joiCompositions = require('../../types/joi-compositions');

const auth = Joi.object().keys({
  email: Joi.string().required().email(),
  password: joiCompositions.password,
});

const userData = Joi.object().keys({
  name: joiCompositions.commonField.min(2).max(30),
});

module.exports.credentials = {
  body: auth,
};

module.exports.user = {
  body: auth.concat(userData),
};
