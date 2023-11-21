"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var pollSchema = new Schema({
  user: {
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
    required: true,
    get: function get(v) {
      return (0, _moment["default"])(v).fromNow();
    }
  },
  endDate: {
    type: Schema.Types.Date,
    required: false,
    get: function get(v) {
      return (0, _moment["default"])(v).fromNow();
    }
  },
  visibility: {
    type: String,
    "enum": ['public', 'private'],
    required: true
  }
}, {
  timestamps: true
});
var Poll = _mongoose["default"].model('Poll', pollSchema);
var _default = exports["default"] = Poll;