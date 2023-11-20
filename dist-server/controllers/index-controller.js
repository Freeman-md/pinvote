"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewVoters = exports.view = exports.index = void 0;
var index = exports.index = function index(req, res, next) {
  res.render('polls/index', {
    title: 'PinVote'
  });
};
var view = exports.view = function view(req, res, next) {
  var id = req.params.id;
  res.render('polls/view', {
    title: 'PinVote • View',
    id: id
  });
};
var viewVoters = exports.viewVoters = function viewVoters(req, res, next) {
  var id = req.params.id;
  res.render('polls/voters', {
    title: 'PinVote • View Voters',
    id: id
  });
};