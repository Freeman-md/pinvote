"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authController = require("../controllers/auth-controller");
var _requestValidation = require("../middlewares/request-validation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get('/create-account', _authController.showCreateAccountPage);
router.get('/login', _authController.showLoginPage);
router.get('/forgot-password', _authController.showForgotPasswordPage);
router.get('/reset-password', _authController.showResetPasswordPage);
router.post('/login', _requestValidation.validateLogin, _authController.login);
router.post('/create-account', _requestValidation.validateCreateAccount, _authController.createAccount);
router.post('/forgot-password', _requestValidation.validateForgotPassword, _authController.forgotPassword);
router.post('/logout', _authController.logout);
var _default = exports["default"] = router;