const jwt = require('jsonwebtoken');
const vault = require('../modules/vault');
const { AuthorizationFailError } = require('../types/errors');

const extractBearerToken = (header) => header.replace('Bearer ', '');

const setSession = (req, token) => {
  const payload = jwt.verify(token, vault.getSecret('JWT_SECRET'));
  req.user = { _id: payload._id };
};

const bearerStrategy = (req) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) throw new AuthorizationFailError('Invalid authorization header');

  const token = extractBearerToken(authorization);
  setSession(req, token);
};

const cookieStrategy = (req) => {
  const token = req.cookies.jwt;

  if (!token) throw new AuthorizationFailError('Invalid authorization cookie');
  setSession(req, token);
};

module.exports = (req, res, next) => {
  try {
    const authStrategy = vault.getSecret('AUTH_STRATEGY');
    switch (authStrategy) {
      case 'bearer': bearerStrategy(req); next(); break;
      case 'cookie': cookieStrategy(req); next(); break;
      default: throw new AuthorizationFailError('Unknown authorization strategy');
    }
  } catch (err) {
    next(err);
  }
};
