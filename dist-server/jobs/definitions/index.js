"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allDefinitions = void 0;
var _mailJobDefinitions = _interopRequireDefault(require("./mail-job-definitions"));
var _notificationJobDefinitions = _interopRequireDefault(require("./notification-job-definitions"));
var _pollJobDefinitions = _interopRequireDefault(require("./poll-job-definitions"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var jobDefinitions = [_mailJobDefinitions["default"], _notificationJobDefinitions["default"], _pollJobDefinitions["default"]];
var allDefinitions = exports.allDefinitions = function allDefinitions(agenda) {
  jobDefinitions.forEach(function (definition) {
    return definition.defineJobs(agenda);
  });
};