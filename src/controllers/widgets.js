const request = require('request');
const querystring = require('querystring');
const mockEntityFramework = require('../adapters/mock-entity-framework');

const _resource = 'http://localhost:3000/widgets';

const controllers = {

  list: function(req, res, next) {
    mockEntityFramework.listById(req.query, function(err, dbResponse, body) {
      let responseData = err ? null : JSON.parse(body)
      res
        .status(dbResponse.statusCode)
        .json({
          data: responseData,
          message: dbResponse.statusMessage,
          code: dbResponse.statusCode
        });
    });
  },
  create: function(req, res, next) {},
  update: function(req, res, next) {},
  delete: function(req, res, next) {}

};

module.exports = controllers;