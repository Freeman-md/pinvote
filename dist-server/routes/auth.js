"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authController = require("../controllers/auth-controller");
var _authRequestValidation = require("../middlewares/auth-request-validation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get('/create-account', _authController.showCreateAccountPage);
router.get('/login', _authController.showLoginPage);
router.get('/forgot-password', _authController.showForgotPasswordPage);
router.get('/reset-password', _authRequestValidation.validateResetPasswordQueryParams, _authController.showResetPasswordPage);
router.post('/login', _authRequestValidation.validateLogin, _authController.login);
router.post('/create-account', _authRequestValidation.validateCreateAccount, _authController.createAccount);
router.post('/forgot-password', _authRequestValidation.validateForgotPassword, _authController.forgotPassword);
router.post('/reset-password', _authRequestValidation.validateResetPassword, _authController.resetPassword);
router.post('/logout', _authController.logout);
var _default = exports["default"] = router;