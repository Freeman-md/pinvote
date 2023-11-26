"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var mongo_db_uri = process.env.MONGO_DB_URI;
var dbConnection = _mongoose["default"].connect(mongo_db_uri);
var _default = exports["default"] = dbConnection;