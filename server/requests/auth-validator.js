import { ExpressValidator, query, validationResult } from "express-validator";
import User from "../models/user";
import BaseValidator from "./validator";

class AuthValidator extends BaseValidator {
  constructor() {
    super()

    // Custom validation methods
    this.body.isEmailNotInUse = async (value) => {
      const user = await User.findOne().byEmail(value);

      if (user) {
        throw new Error('E-mail already in use');
      }
    };

    this.body.isEmailExists = async (value) => {
      const user = await User.findOne().byEmail(value);

      if (!user) {
        throw new Error('User with email address does not exist');
      }
    };

    // Validation rules
    this.resetPasswordQueryParams = [
      query('token').trim().notEmpty().escape().withMessage('Invalid token'),
      query('email').trim().notEmpty().escape().isEmail().withMessage('Invalid email'),
    ];

    this.createAccount = [
      this.body('firstName').trim().notEmpty().escape().isLength({
        min: 3
      }),
      this.body('lastName').trim().notEmpty().escape().isLength({
        min: 3
      }),
      this.body('email').trim().notEmpty().escape().isEmail().custom(this.body.isEmailNotInUse),
      this.body('password').trim().notEmpty().isStrongPassword(),
      this.body('confirmPassword').trim().custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match'),
    ];

    this.login = [
      this.body('email').trim().notEmpty().escape().isEmail().custom(this.body.isEmailExists),
      this.body('password').trim().notEmpty(),
    ];

    this.forgotPassword = [
      this.body('email').trim().notEmpty().escape().isEmail().custom(this.body.isEmailExists),
    ];

    this.resetPassword = [
      this.body('token').trim().notEmpty().escape(),
      this.body('email').trim().notEmpty().escape().isEmail().custom(this.body.isEmailExists),
      this.body('password').trim().notEmpty().isStrongPassword(),
      this.body('confirmPassword').trim().custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match'),
    ];
  }
}

export default new AuthValidator();