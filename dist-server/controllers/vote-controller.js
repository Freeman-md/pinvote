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
  if (!errors.isEmpty()) {
    res.json({
      error: error.message
    });
  }
  try {
    var _matchedData = (0, _expressValidator.matchedData)(req),
      pollId = _matchedData.pollId,
      optionId = _matchedData.optionId;
    _voteService["default"].recordVote(req.session.user._id, pollId, optionId);
    res.status(200).json({
      message: 'Vote recorded successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};