"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = exports.edit = exports.create = void 0;
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
var edit = exports.edit = function edit(req, res, next) {
  var id = req.params.id;
  res.render('user/polls/edit', {
    title: 'My Polls • Edit',
    id: id
  });
};