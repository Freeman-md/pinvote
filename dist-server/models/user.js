"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var bcryptSalt = process.env.BCRYPT_SALT;
var userSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: String,
  polls: [{
    type: Schema.Types.ObjectId,
    ref: 'Poll'
  }],
  votes: [{
    type: Schema.Types.ObjectId,
    ref: 'Vote'
  }]
}, {
  timestamps: true,
  query: {
    byEmail: function byEmail(email) {
      return this.where({
        email: email
      });
    }
  },
  virtuals: {
    fullName: {
      get: function get() {
        return this.name.first + ' ' + this.name.last;
      }
    }
  }
});
var User = _mongoose["default"].model('User', userSchema);
var _default = exports["default"] = User;