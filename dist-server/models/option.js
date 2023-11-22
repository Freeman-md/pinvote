"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var optionSchema = new Schema({
  poll: {
    type: Schema.Types.ObjectId,
    ref: 'Poll'
  },
  text: {
    type: String,
    required: true
  },
  votes: [{
    type: Schema.Types.ObjectId,
    ref: 'Vote'
  }]
}, {
  timestamps: true
});
var Option = _mongoose["default"].model('Option', optionSchema);
var _default = exports["default"] = Option;