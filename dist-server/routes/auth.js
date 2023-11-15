"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authController = require("../controllers/auth-controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get('/register', _authController.showCreateAccountPage);
router.get('/login', _authController.showLoginPage);
router.get('/forgot-password', _authController.showForgotPasswordPage);
router.get('/reset-password', _authController.showResetPasswordPage);
var _default = exports["default"] = router;