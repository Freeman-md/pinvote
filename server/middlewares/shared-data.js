import appConfig from "../config/app";
import { processValidationErrors } from "../utils/helpers";

export const sharedDataMiddleware = (req, res, next) => {
    const errors = req.flash('errors');
    const info = req.flash('info');
    const formData = req.flash('formData');
  
    res.locals.errors = processValidationErrors(errors);
    res.locals.info = info.length > 0 ? info[0] : null;
    res.locals.formData = formData ? formData[0] : null;
    res.locals.authenticated = req.session.authenticated;
    res.locals.user = req.session.user;
    res.locals.app = {
      url: appConfig.env.appUrl
    };
    res.locals.csrfToken = req.csrfToken();
  
    next();
  };
  
  export default sharedDataMiddleware;
  