const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const celebrateErrors = require('celebrate').errors;
const vault = require('./src/modules/vault');
const createLogger = require('./src/modules/logger');
const routes = require('./src/routes');
const db = require('./src/resources/database');
const errHandler = require('./src/middlewares/errhandler');
const rateLimit = require('./src/middlewares/ratelimit');

if (!vault.init()) {
  // Тут наши полномочия все, мы в проде и не сконфигурированы
  const errLogger = createLogger();
  errLogger.error('Vault not configured, process exists');
  process.exit(-1);
}

const loggerOptions = {
  level: 'info',
  format: vault.getSecret('LOGS_FORMAT'),
  transportType: vault.getSecret('LOGS_TYPE'),
  dirname: vault.getSecret('LOGS_DIR'),
};

db.connect(vault.getSecret('DB_URI'));

const app = express();

if (vault.getSecret('NODE_ENV') === 'production') {
  app.use(helmet());
  app.use(rateLimit);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (vault.getSecret('AUTH_STRATEGY') === 'cookie') {
  app.use(cookieParser());
}

app.use(createLogger({
  ...loggerOptions,
  loggerType: 'middlewareLogger',
  filename: 'request.log',
}));
app.use(cors({
  origin: (origin, cb) => cb(null, true),
  credentials: true,
}));
app.use(routes);
app.use(celebrateErrors());
app.use(createLogger({
  ...loggerOptions,
  loggerType: 'middlewareErrorLogger',
  filename: 'error.log',
}));
app.use(errHandler(vault.getSecret('NODE_ENV')));

app.listen(vault.getSecret('PORT'));
