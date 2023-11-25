"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineMailJobs = void 0;
var _events = _interopRequireDefault(require("../../lib/emitter/events"));
var _handlers = _interopRequireDefault(require("../handlers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var defineMailJobs = exports.defineMailJobs = function defineMailJobs(agenda) {
  agenda.define(_events["default"].SEND_PASSWORD_RESET_MAIL, _handlers["default"].sendPasswordResetEmail);
};