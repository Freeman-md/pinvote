import { body } from "express-validator";
import bcrypt from 'bcryptjs'
import { UserService } from "../services/user-service";

export const validateCreateAccount = [
    body('firstName').trim().notEmpty().isLength({
        min: 3
    }),
    body('lastName').trim().notEmpty().isLength({
        min: 3
    }),
    body('email').trim().notEmpty().isEmail().custom(async value => {
        const user = await UserService.findUserByEmail(value)

        if (user) {
            throw new Error('E-mail already in use');
        }
    }),
    body('password').trim().notEmpty().isStrongPassword(),
    body('confirmPassword').trim().custom((value, { req }) => {
        return value === req.body.password
    }).withMessage('Passwords do not match'),
]

export const validateLogin = [
    body('email').trim().notEmpty().isEmail().custom(async value => {
        const user = await UserService.findUserByEmail(value)

        if (!user) {
            throw new Error('User with email address does not exist');
        }
    }),
    body('password').trim().notEmpty(),
]

export const validateForgotPassword = [
    body('email').trim().notEmpty().isEmail().custom(async value => {
        const user = await UserService.findUserByEmail(value)

        if (!user) {
            throw new Error('User with email address does not exist');
        }
    }),
]