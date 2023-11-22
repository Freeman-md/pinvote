"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateQuery = exports.validateParam = void 0;
var _expressValidator = require("express-validator");
var validateQuery = exports.validateQuery = function validateQuery(value) {
  // If the value is an array, validate each element
  if (Array.isArray(value)) {
    return value.map(function (element) {
      return (0, _expressValidator.query)(element).trim().notEmpty().escape();
    });
  }

  // If the value is a single string, validate it
  return (0, _expressValidator.query)(value).trim().notEmpty().escape();
};
var validateParam = exports.validateParam = function validateParam(value) {
  // If the value is an array, validate each element
  if (Array.isArray(value)) {
    return value.map(function (element) {
      return (0, _expressValidator.param)(element).trim().notEmpty().escape();
    });
  }

  // If the value is a single string, validate it
  return (0, _expressValidator.param)(value).trim().notEmpty().escape();
};