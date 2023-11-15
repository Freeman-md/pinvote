"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = void 0;
var index = exports.index = function index(req, res, next) {
  res.render('user/dashboard', {
    title: 'User Dashboard'
  });
};