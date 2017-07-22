const request = require('request');
const mockEntityFramework = require('../adapters/mock-entity-framework');
const validator = require('jsonschema').validate;
const schema = require('../validators/schema.json');

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
  create: function(req, res, next) {
    let validation = validator(req.body, schema);
    if (validation.errors.length) {
      let BAD_REQUEST = 400;
      res
        .status(BAD_REQUEST)
        .json({
          data: null,
          message: validation.errors.map(e => e.message),
          code: BAD_REQUEST
        });
    } else {
      mockEntityFramework.createWidget(req.body, function(err, widget) {
        let OK = 201;
        res
          .status(OK)
          .json({
            data: widget.data,
            message: widget.message,
            code: OK
          });
      });
    }
  },
  update: function(req, res, next) {},
  delete: function(req, res, next) {}

};

module.exports = controllers;