const express = require('express');
const controller = require('../controllers/widgets');

const app = express();

app
  .get('/', controller['list'])
  .post('/', controller['create'])
  .put('/:id', controller['update']);

module.exports = app;