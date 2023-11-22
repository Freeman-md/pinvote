"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePollUpdate = exports.validatePoll = void 0;
var _expressValidator = require("express-validator");
var _pollService = _interopRequireDefault(require("../services/poll-service"));
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var validateStartDate = function validateStartDate(startDate) {
  var now = new Date();
  var yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  var startDateObj = new Date(startDate);
  if (isNaN(startDateObj) || startDateObj <= yesterday) {
    throw new Error('Start date must be now or greater');
  }
  return true;
};
var validateEndDate = function validateEndDate(endDate, _ref) {
  var req = _ref.req;
  var startDate = req.body.startDate;
  var endDateObj = new Date(endDate);
  var startDateObj = new Date(startDate);
  if (isNaN(endDateObj) || endDateObj <= startDateObj) {
    throw new Error('End date must be one day ahead of the start date');
  }
  return true;
};
var validatePoll = exports.validatePoll = [(0, _expressValidator.body)('question').trim().notEmpty().escape().isLength({
  min: 10
}).withMessage('Question must be more than 10 characters'), (0, _expressValidator.body)('options').isArray({
  min: 2
}), (0, _expressValidator.body)('options.*').trim().notEmpty().isLength({
  min: 3,
  max: 30
}), (0, _expressValidator.body)('startDate').escape().isDate({
  format: 'YYYY-MM-DDTHH:mm'
}).withMessage('Start date is invalid'), (0, _expressValidator.body)('endDate').escape().isDate({
  format: 'YYYY-MM-DDTHH:mm'
}).withMessage('End date is invalid'), (0, _expressValidator.body)('visibility').isIn(['public', 'private'])];
var validatePollUpdate = exports.validatePollUpdate = [(0, _expressValidator.body)('question').trim().notEmpty().escape().isLength({
  min: 10
}).withMessage('Question must be more than 10 characters'), (0, _expressValidator.body)('options').isArray({
  min: 2
}), (0, _expressValidator.body)('options.*').trim().notEmpty().isLength({
  min: 3,
  max: 30
}), (0, _expressValidator.body)('startDate').escape().isDate(), (0, _expressValidator.body)('endDate').escape().isDate().custom(validateEndDate), (0, _expressValidator.body)('visibility').isIn(['public', 'private'])];