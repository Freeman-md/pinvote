"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vote = void 0;
var _expressValidator = require("express-validator");
var _voteService = _interopRequireDefault(require("../services/vote-service"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var vote = exports.vote = function vote(req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);
  console.log('errors', errors);
  if (!errors.isEmpty()) {
    return res.status(500).json({
      message: 'Error recording vote'
    });
  }
  try {
    var _matchedData = (0, _expressValidator.matchedData)(req),
      pollId = _matchedData.id,
      option = _matchedData.option;
    _voteService["default"].recordVote(req.session.user._id, pollId, option);
    return res.status(200).json({
      message: 'Vote recorded successfully'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};