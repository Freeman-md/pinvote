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
  option: {
    type: Schema.Types.ObjectId,
    ref: 'Option',
    required: true
  },
  poll: {
    type: Schema.Types.ObjectId
  }
}, {
  timestamps: true
});
var Vote = _mongoose["default"].model('Vote', voteSchema);
var _default = exports["default"] = Vote;