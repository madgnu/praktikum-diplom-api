const mongoose = require('mongoose');

const connetOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

module.exports.connect = (dbUri, onConnect) => mongoose.connect(dbUri, connetOptions, onConnect);
