export const flashErrorsAndRedirect = (req, res, validationResult) => {
    req.flash('errors', validationResult.errors);
    req.flash('formData', validationResult.formData);
    res.redirect('back');
};