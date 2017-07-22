const express = require('express');
const controller = require('../controllers/widgets');

const app = express();

app.get('/', controller['list']);
app.post('/', controller['create']);

module.exports = app;