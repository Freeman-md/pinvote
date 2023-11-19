import { matchedData, validationResult } from "express-validator"
import bcrypt from 'bcryptjs'

import { flashErrorsAndRedirect } from "../utils/helpers"
import { UserService } from "../services/user-service"
import User from "../models/user"

export const showCreateAccountPage = (req, res, next) => {
    res.render('auth/create-account', {
        title: 'Create an account',
    })
}

export const showLoginPage = (req, res, next) => {
    res.render('auth/login', {
        title: 'Login'
    })
}

export const showForgotPasswordPage = (req, res, next) => {
    res.render('auth/forgot-password', {
        title: 'Forgot Password'
    })
}

export const showResetPasswordPage = (req, res, next) => {
    res.render('auth/reset-password', {
        title: 'Reset Password'
    })
}

export const createAccount = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return flashErrorsAndRedirect(req, res, {
            errors: errors.array(),
            formData: req.body
        })
    }

    // get validated data
    const data = matchedData(req)

    // create user
    User.create(data)
        .then(result => res.redirect('/auth/login'))
        .catch(err => console.log(err))
}

export const login = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return flashErrorsAndRedirect(req, res, {
            errors: errors.array(),
            formData: req.body
        })
    }

    // get validated data
    const { email, password } = matchedData(req)

    try {
        const user = await UserService.findUserByEmail(email)

        if (!user) {
            return flashErrorsAndRedirect(req, res, {
                errors: [
                    {
                        msg: 'User with email address does not exist',
                        path: 'global'
                    }
                ],
                formData: {
                    email,
                }
            })
        }

        const doesPasswordMatch = await bcrypt.compare(password, user.password)

        if (!doesPasswordMatch) {
            return flashErrorsAndRedirect(req, res, {
                errors: [
                    {
                        msg: 'Password is invalid',
                        path: 'global'
                    }
                ],
                formData: {
                    email,
                }
            })
        }

        req.session.authenticated = true
        req.session.user = user

        return res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}