"use strict";

var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/user-controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get('/polls', _userController.index);
router.get('/polls/create', _userController.create);
module.exports = router;