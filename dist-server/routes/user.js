"use strict";

var _express = _interopRequireDefault(require("express"));
var _poll = _interopRequireDefault(require("./poll"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.use('/polls', _poll["default"]);
module.exports = router;