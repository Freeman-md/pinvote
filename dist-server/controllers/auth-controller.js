"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showResetPasswordPage = exports.showLoginPage = exports.showForgotPasswordPage = exports.showCreateAccountPage = exports.createAccount = void 0;
var _expressValidator = require("express-validator");
var _user = _interopRequireDefault(require("../models/user"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var showCreateAccountPage = exports.showCreateAccountPage = function showCreateAccountPage(req, res, next) {
  res.render('auth/create-account', {
    title: 'Create an account'
  });
};
var showLoginPage = exports.showLoginPage = function showLoginPage(req, res, next) {
  res.render('auth/login', {
    title: 'Login'
  });
};
var showForgotPasswordPage = exports.showForgotPasswordPage = function showForgotPasswordPage(req, res, next) {
  res.render('auth/forgot-password', {
    title: 'Forgot Password'
  });
};
var showResetPasswordPage = exports.showResetPasswordPage = function showResetPasswordPage(req, res, next) {
  res.render('auth/reset-password', {
    title: 'Reset Password'
  });
};
var createAccount = exports.createAccount = function createAccount(req, res, next) {
  var result = (0, _expressValidator.validationResult)(req);
  if (!result.isEmpty()) {
    req.flash('errors', result.array());
    req.flash('formData', req.body);
    return res.redirect('back');
  }

  // get validated data
  var data = (0, _expressValidator.matchedData)(req);

  // create user
  _user["default"].create(data).then(function (result) {
    return res.redirect('/auth/login');
  })["catch"](function (err) {
    return console.log(err);
  });
};