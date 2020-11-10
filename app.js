const e = require('express');
const express = require('express');

const {
  PORT = 3000,
} = process.env;

const app = express();

app.get('/', (req, res) => res.send('OK'));

app.listen(PORT);
