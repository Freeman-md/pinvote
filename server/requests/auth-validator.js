import { body, query } from "express-validator";
import User from "../models/user";
import BaseValidator from "./validator";

class AuthValidator extends BaseValidator {
  constructor() {
    super()

    // Custom validation methods
    this.isEmailNotInUse = async (value) => {
      const user = await User.findOne().byEmail(value);

      if (user) {
        throw new Error('E-mail already in use');
      }
    };

    this.isEmailExists = async (value) => {
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
      body('firstName').trim().notEmpty().escape().isLength({
        min: 3
      }),
      body('lastName').trim().notEmpty().escape().isLength({
        min: 3
      }),
      body('email').trim().notEmpty().escape().isEmail().custom(this.isEmailNotInUse),
      body('password').trim().notEmpty().isStrongPassword(),
      body('confirmPassword').trim().custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match'),
    ];

    this.login = [
      body('email').trim().notEmpty().escape().isEmail().custom(this.isEmailExists),
      body('password').trim().notEmpty(),
    ];

    this.forgotPassword = [
      body('email').trim().notEmpty().escape().isEmail().custom(this.isEmailExists),
    ];

    this.resetPassword = [
      body('token').trim().notEmpty().escape(),
      body('email').trim().notEmpty().escape().isEmail().custom(this.isEmailExists),
      body('password').trim().notEmpty().isStrongPassword(),
      body('confirmPassword').trim().custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match'),
    ];
  }
}

export default new AuthValidator();