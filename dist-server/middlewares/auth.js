"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuth = void 0;
var isAuth = exports.isAuth = function isAuth(req, res, next) {
  if (req.originalUrl.includes('auth') && !req.path.includes('logout')) {
    if (req.session.authenticated) {
      return res.redirect('/');
    }
    return next();
  }
  if (!req.session.authenticated && !req.session.user) {
    return res.redirect('/auth/login');
  }
  next();
};