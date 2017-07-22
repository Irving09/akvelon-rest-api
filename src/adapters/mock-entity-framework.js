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
  updateWidget: function(id, body, callback) {
    let widgets = db.get('widgets');

    let original = widgets
      .find({ id: id })
      .value();

    console.log('=======>', id, original);
    let newUpdate = {
      name: body.name ? body.name : original.name,
      description: body.description ? body.description : original.description,
      price: body.price ? body.price : original.price
    };
    console.log('=======>', newUpdate);

    let updatedWidget = widgets
      .find({ id: id })
      .assign(newUpdate)
      .value();

    callback(null, {
      data: updatedWidget,
      message: 'Updated'
    });
  },
  delete: function(req, res, next) {}
};

module.exports = mockEntityFramework;