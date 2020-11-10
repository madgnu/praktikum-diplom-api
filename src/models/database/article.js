const mongoose = require('mongoose');
const validator = require('validator');

const isUrl = (url) => validator.isURL(url, {
  protocols: ['http', 'https'],
  require_protocol: true,
});

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    // TO-DO: Уточнить
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: isUrl,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: isUrl,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
});

module.exports = mongoose.model('article', articleSchema);
