"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = exports.create = void 0;
var index = exports.index = function index(req, res, next) {
  res.render('user/polls', {
    title: 'My Polls'
  });
};
var create = exports.create = function create(req, res, next) {
  res.render('user/polls/create', {
    title: 'My Polls • Create'
  });
};