const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const celebrateErrors = require('celebrate').errors;
const vault = require('./src/modules/vault');
const routes = require('./src/routes');
const db = require('./src/resources/database');
const logger = require('./src/middlewares/logger');
const errHandler = require('./src/middlewares/errhandler');

if (!vault.init()) {
  process.exit(-1);
}

const loggerOptions = {
  format: vault.getSecret('LOGS_FORMAT'),
  transportType: vault.getSecret('LOGS_TYPE'),
  dirname: vault.getSecret('LOGS_DIR'),
};

const limiterOptions = {
  windowMs: 60 * 1000,
  max: vault.getSecret('REQ_PER_MIN'),
};

db.connect(vault.getSecret('DB_URI'));

const app = express();

if (vault.getSecret('NODE_ENV') === 'production') {
  app.use(helmet());
  app.use(rateLimit(limiterOptions));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (vault.getSecret('AUTH_STRATEGY') === 'cookie') {
  app.use(cookieParser());
}

app.use(logger({
  ...loggerOptions,
  loggerType: 'log',
  filename: 'request.log',
}));
app.use(routes);
app.use(celebrateErrors());
app.use(logger({
  ...loggerOptions,
  loggerType: 'error',
  filename: 'error.log',
}));
app.use(errHandler(vault.getSecret('NODE_ENV')));

app.listen(vault.getSecret('PORT'));
