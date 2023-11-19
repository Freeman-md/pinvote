import { matchedData, validationResult } from "express-validator"
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
        req.flash('errors', errors.array())
        req.flash('formData', req.body)

        return res.redirect('back')
    }

    // get validated data
    const data = matchedData(req)

    console.log(data)

    // create user
    User.create(data)
        .then(result => res.redirect('/auth/login'))
        .catch(err => console.log(err))
}