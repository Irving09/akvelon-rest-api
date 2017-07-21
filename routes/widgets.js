const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  console.log(req.query);

  res.send({
    id: req.query.id,
    name: 'inno',
    description: 'inno was here',
    price: 45.09
  });
});

module.exports = app;