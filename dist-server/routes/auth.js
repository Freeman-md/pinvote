"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authValidator = _interopRequireDefault(require("../requests/auth-validator"));
var _authController = _interopRequireWildcard(require("../controllers/auth-controller"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get('/create-account', _authController["default"].showCreateAccountPage);
router.get('/login', _authController["default"].showLoginPage);
router.get('/forgot-password', _authController["default"].showForgotPasswordPage);
router.get('/reset-password', _authValidator["default"].resetPasswordQueryParams, _authController["default"].showResetPasswordPage);
router.post('/login', _authValidator["default"].login, _authValidator["default"].validate, _authController["default"].login);
router.post('/create-account', _authValidator["default"].createAccount, _authValidator["default"].validate, _authController["default"].createAccount);
router.post('/forgot-password', _authValidator["default"].forgotPassword, _authValidator["default"].validate, _authController["default"].forgotPassword);
router.post('/reset-password', _authValidator["default"].resetPassword, _authValidator["default"].validate, _authController["default"].resetPassword);
router.post('/logout', _authController["default"].logout);
var _default = exports["default"] = router;