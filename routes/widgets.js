const express = require('express');
const controller = require('../controllers/widgets');

const app = express();

app.get('/', controller['list']);

module.exports = app;