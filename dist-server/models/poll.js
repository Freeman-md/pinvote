"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var pollSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: {
    type: Schema.Types.Array,
    required: true
  },
  startDate: {
    type: Schema.Types.Date,
    required: true
  },
  endDate: {
    type: Schema.Types.Date,
    required: false
  },
  visibility: {
    type: String,
    "enum": ['public', 'private'],
    required: true
  }
});
var Poll = _mongoose["default"].model('Poll', pollSchema);
var _default = exports["default"] = Poll;