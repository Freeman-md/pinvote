"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flashErrorsAndRedirect = void 0;
var flashErrorsAndRedirect = exports.flashErrorsAndRedirect = function flashErrorsAndRedirect(req, res, validationResult) {
  req.flash('errors', validationResult.errors);
  req.flash('formData', validationResult.formData);
  res.redirect('back');
};