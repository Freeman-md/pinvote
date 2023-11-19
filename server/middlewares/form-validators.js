import { body } from "express-validator";
import bcrypt from 'bcryptjs'
import User from "../models/user";

export const validateCreateAccountForm = [
    body('firstName').trim().notEmpty().isLength({
        min: 3
    }),
    body('lastName').trim().notEmpty().isLength({
        min: 3
    }),
    body('email').trim().normalizeEmail().notEmpty().isEmail().custom(async value => {
        const user = await User.findOne({
            email: value,
        });
        
        if (user) {
          throw new Error('E-mail already in use');
        }
      }),
    body('password').trim().notEmpty().isStrongPassword(),
    body('confirmPassword').trim().custom((value, { req }) => {
        return value === req.body.password
    }).withMessage('Passwords do not match'),
    body('password').customSanitizer(async value => await bcrypt.hash(value, 12))
]