const { Joi } = require('celebrate');
const joiCompositions = require('../../types/joi-compositions');

const resource = Joi.object().keys({
  articleId: joiCompositions.objectId,
});

const article = Joi.object().keys({
  keyword: joiCompositions.commonField,
  title: joiCompositions.commonField,
  text: joiCompositions.commonField,
  date: joiCompositions.commonField,
  source: joiCompositions.commonField,
  link: joiCompositions.url,
  image: joiCompositions.url,
});

module.exports.resource = {
  params: resource,
};

module.exports.article = {
  body: article,
};
