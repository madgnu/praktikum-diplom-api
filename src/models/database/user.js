const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { AuthorizationFailError } = require('../../types/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    set: (value) => bcrypt.hashSync(value, 12),
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

async function findUserByCredentials(login, password) {
  const user = await this
    .findOne({ email: login })
    .select('+password')
    .orFail(new AuthorizationFailError('User not found'));
  if (!await bcrypt.compare(password, user.password)) throw new AuthorizationFailError('Hash mismatch');
  return user;
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
