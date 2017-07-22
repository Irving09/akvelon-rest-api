const request = require('request');
const queryString = require('querystring');
const lowdb = require('lowdb');
const db = lowdb('db.json')

const _resource = 'http://localhost:3000/widgets';

const mockEntityFramework = {
  listById: function(queryObject, callback) {
    let query = queryString.stringify(queryObject);
    let endpoint = _resource;
    if (query.length) {
      endpoint = `${_resource}?${query}`;
    }
    request(endpoint, callback);
  },
  createWidget: function(widget, callback) {
    let widgets = db.get('widgets');
    let generatedId = Date.now();

    widgets
      .push(widget)
      .last()
      .assign({ id: generatedId })
      .write();

    let createdWidget = widgets
      .find({ id: generatedId })
      .value();

    callback(null, {
      data: createdWidget,
      message: 'Created'
    });
  },
  update: function(req, res, next) {},
  delete: function(req, res, next) {}
};

module.exports = mockEntityFramework;