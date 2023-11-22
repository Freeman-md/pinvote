"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var voteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  poll: {
    type: Schema.Types.ObjectId,
    ref: 'Poll',
    required: true
  },
  option: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  query: {
    byPoll: function byPoll(pollId) {
      return this.where({
        poll: pollId
      });
    },
    byUser: function byUser(userId) {
      return this.where({
        user: userId
      });
    },
    byPollAndUser: function byPollAndUser(pollId, userId) {
      return this.where({
        poll: pollId,
        user: userId
      });
    }
  }
});
var Vote = _mongoose["default"].model('Vote', voteSchema);
var _default = exports["default"] = Vote;