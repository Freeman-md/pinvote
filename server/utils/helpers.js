export const flashErrorsAndRedirect = (req, res, validationResult) => {
  req.flash('errors', validationResult.errors);
  req.flash('formData', validationResult.formData);
  res.redirect('back');
};

export const processValidationErrors = (errors) => {
  const errorObject = {};

  errors.forEach(item => {
    errorObject[item.path] = item.msg;
  });

  return errorObject;
}

export const handleGlobalError = (req, res, error) => {
  // console.error(error);
  return flashErrorsAndRedirect(req, res, {
    errors: [
      {
        msg: error.message,
        path: 'global',
      },
    ],
    formData: req.body,
  });
}