import { ExpressValidator, query } from "express-validator";
import UserService from "../services/user-service";

const { body } = new ExpressValidator({
    isEmailNotInUse: async value => {
        const user = await UserService.findUserByEmail(value)

        if (user) {
            throw new Error('E-mail already in use');
        }
    },
    isEmailExists: async value => {
        const user = await UserService.findUserByEmail(value)

        if (!user) {
            throw new Error('User with email address does not exist');
        }
    }
  });

export const validateResetPasswordQueryParams = [
    query('token').trim().notEmpty().escape().withMessage('Invalid token'),
    query('email').trim().notEmpty().escape().isEmail().withMessage('Invalid email')
]

export const validateCreateAccount = [
    body('firstName').trim().notEmpty().escape().isLength({
        min: 3
    }),
    body('lastName').trim().notEmpty().escape().isLength({
        min: 3
    }),
    body('email').trim().notEmpty().escape().isEmail().isEmailNotInUse(),
    body('password').trim().notEmpty().escape().isStrongPassword(),
    body('confirmPassword').trim().escape().custom((value, { req }) => {
        return value === req.body.password
    }).withMessage('Passwords do not match'),
]

export const validateLogin = [
    body('email').trim().notEmpty().escape().isEmail().isEmailExists(),
    body('password').trim().notEmpty(),
]

export const validateForgotPassword = [
    body('email').trim().notEmpty().escape().isEmail().isEmailExists(),
]

export const validateResetPassword = [
    body('token').trim().notEmpty().escape(),
    body('email').trim().notEmpty().escape().isEmail().isEmailExists(),
    body('password').trim().notEmpty().escape().isStrongPassword(),
    body('confirmPassword').trim().escape().custom((value, { req }) => {
        return value === req.body.password
    }).withMessage('Passwords do not match'),
]