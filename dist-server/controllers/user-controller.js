"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = exports.index = exports.edit = exports.create = void 0;
var _expressValidator = require("express-validator");
var _helpers = require("../utils/helpers");
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
var store = exports.store = function store(req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    return (0, _helpers.flashErrorsAndRedirect)(req, res, {
      errors: errors.array(),
      formData: req.body
    });
  }
  var data = (0, _expressValidator.matchedData)(req);
  try {
    res.redirect('/user/polls');
  } catch (error) {
    return (0, _helpers.flashErrorsAndRedirect)(req, res, {
      errors: [{
        msg: error.message,
        path: 'global'
      }],
      formData: req.body
    });
  }
};