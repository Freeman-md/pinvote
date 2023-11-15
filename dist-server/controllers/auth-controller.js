"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showResetPasswordPage = exports.showLoginPage = exports.showForgotPasswordPage = exports.showCreateAccountPage = void 0;
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