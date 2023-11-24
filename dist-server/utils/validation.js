"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRequest = void 0;
var _expressValidator = require("express-validator");
var _helpers = require("./helpers");
var validateRequest = exports.validateRequest = function validateRequest(req, res) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    return errors.array();
  }

  // return validated data
  return (0, _expressValidator.matchedData)(req);
};