"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuth = void 0;
var isAuth = exports.isAuth = function isAuth(req, res, next) {
  if (!req.session.authenticated && !req.session.user) {
    return res.redirect('/auth/login');
  }
  if (req.session.authenticated && req.originalUrl.includes('auth')) {
    return res.redirect('/');
  }
  console.log(req);
  next();
};