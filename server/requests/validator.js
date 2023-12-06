import { ExpressValidator, validationResult } from "express-validator";
import { flashErrorsAndRedirect } from "../utils/helpers";

class BaseValidator {
      validate = (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          return next();
        }
    
        return flashErrorsAndRedirect(req, res, {
            errors: errors.array(),
            formData: req.body
        })
      };
}

export default BaseValidator