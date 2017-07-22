const request = require('request');
const querystring = require('querystring');
const mockEntityFramework = require('../adapters/mock-entity-framework');

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
    let newWidget = {
      name: "inno widget",
      description: "description for inno widget",
      price: 9000 
    };
    mockEntityFramework.createWidget(newWidget, function(err, widget) {
      let statusCode = 201;
      let test = {
        data: widget.data,
        message: widget.message,
        code: statusCode
      };
      console.log('===> in here', test);
      res
        .status(statusCode)
        .json(test);
    });
  },
  update: function(req, res, next) {},
  delete: function(req, res, next) {}

};

module.exports = controllers;