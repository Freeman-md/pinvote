"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allDefinitions = void 0;
var _mailJobDefinitions = _interopRequireDefault(require("./mail-job-definitions"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// jobs/definitions/index.js

var jobDefinitions = [_mailJobDefinitions["default"]];
var allDefinitions = exports.allDefinitions = function allDefinitions(agenda) {
  jobDefinitions.forEach(function (definition) {
    return definition.defineJobs(agenda);
  });
};