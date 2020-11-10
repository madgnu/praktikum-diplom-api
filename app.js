const express = require('express');
const bodyParser = require('body-parser');
const vault = require('./src/modules/vault');
const routes = require('./src/routes');
const db = require('./src/resources/database');

if (!vault.init()) {
  process.exit(-1);
}

db.connect(vault.getSecret('DB_URI'), () => console.log('db connected'));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(vault.getSecret('PORT'));
