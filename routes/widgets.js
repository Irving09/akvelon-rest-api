const express = require('express');
const app = express();

app.get('/', function(req, res, next) {
  res.render('widgets', {
    title: 'Widgets'
  });
});

module.exports = app;