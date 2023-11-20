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