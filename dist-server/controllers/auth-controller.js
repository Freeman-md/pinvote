"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showRegistrationPage = void 0;
var showRegistrationPage = exports.showRegistrationPage = function showRegistrationPage(req, res, next) {
  res.render('auth/register', {
    title: 'Register'
  });
};