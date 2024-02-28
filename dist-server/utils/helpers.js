"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processValidationErrors = exports.handleGlobalError = exports.flashErrorsAndRedirect = void 0;
var flashErrorsAndRedirect = exports.flashErrorsAndRedirect = function flashErrorsAndRedirect(req, res, validationResult) {
  req.flash('errors', validationResult.errors);
  req.flash('formData', validationResult.formData);
  res.redirect('back');
};
var processValidationErrors = exports.processValidationErrors = function processValidationErrors(errors) {
  var errorObject = {};
  errors.forEach(function (item) {
    errorObject[item.path] = item.msg;
  });
  return errorObject;
};
var handleGlobalError = exports.handleGlobalError = function handleGlobalError(req, res, error) {
  // console.error(error);
  return flashErrorsAndRedirect(req, res, {
    errors: [{
      msg: error.message,
      path: 'global'
    }],
    formData: req.body
  });
};