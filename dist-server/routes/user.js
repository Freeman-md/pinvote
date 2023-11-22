"use strict";

var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/user-controller");
var _pollRequestValidation = require("../middlewares/poll-request-validation");
var _expressValidator = require("express-validator");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get('/polls', _userController.index);
router.get('/polls/create', _userController.create);
router.get('/polls/:id/edit', (0, _expressValidator.param)('id').trim().notEmpty().escape(), _userController.edit);
router.post('/polls', _pollRequestValidation.validatePoll, _userController.store);
router.post('/polls/:id/update', (0, _expressValidator.param)('id').trim().notEmpty().escape(), _pollRequestValidation.validatePollUpdate, _userController.update);
router.post('/polls/:id/delete', (0, _expressValidator.param)('id').trim().notEmpty().escape(), _userController.deletePoll);
module.exports = router;