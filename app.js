const express = require('express');
const routes = require('./src/routes');
const db = require('./src/resources/database');

const {
  PORT = 3000,
  DB_URI = 'mongodb://localhost:27017/diploma',
} = process.env;

db.connect(DB_URI, () => console.log('db connected'));

const app = express();
app.use(routes);

app.listen(PORT);
