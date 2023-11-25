"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allDefinitions = void 0;
var _mails = require("./mails");
var jobDefinitions = [_mails.defineMailJobs];
var allDefinitions = exports.allDefinitions = function allDefinitions(agenda) {
  jobDefinitions.forEach(function (definition) {
    return definition(agenda);
  });
};