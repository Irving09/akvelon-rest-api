const request = require('request');
const queryString = require('querystring');

const _resource = 'http://localhost:3000/widgets';

const mockEntityFramework = {
  listById: function(queryObject, callback) {
    let query = queryString.stringify(queryObject);
    let endpoint = _resource;
    if (query.length) {
      endpoint = `${_resource}?${query}`;
    }
    console.log(endpoint);

    request(endpoint, callback);
  },
  create: function(req, res, next) {},
  update: function(req, res, next) {},
  delete: function(req, res, next) {}
};

module.exports = mockEntityFramework;