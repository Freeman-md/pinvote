"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.view = exports.index = void 0;
var index = exports.index = function index(req, res, next) {
  res.render('index', {
    title: 'PinVote'
  });
};
var view = exports.view = function view(req, res, next) {
  var id = req.params.id;
  res.render('view', {
    title: 'PinVote',
    id: id
  });
};