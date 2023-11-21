"use strict";

var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/user-controller");
var _pollRequestValidation = require("../middlewares/poll-request-validation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get('/polls', _userController.index);
router.get('/polls/create', _userController.create);
router.get('/polls/:id/edit', _userController.edit);
router.post('/polls', _pollRequestValidation.validatePoll, _userController.store);
module.exports = router;