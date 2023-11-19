"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authController = require("../controllers/auth-controller");
var _formValidators = require("../middlewares/form-validators");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get('/create-account', _authController.showCreateAccountPage);
router.get('/login', _authController.showLoginPage);
router.get('/forgot-password', _authController.showForgotPasswordPage);
router.get('/reset-password', _authController.showResetPasswordPage);
router.post('/login', _formValidators.validateLogin, _authController.login);
router.post('/logout', _authController.logout);
router.post('/create-account', _formValidators.validateCreateAccount, _authController.createAccount);
var _default = exports["default"] = router;