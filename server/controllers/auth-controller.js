import { matchedData, validationResult } from "express-validator"

import { flashErrorsAndRedirect, processValidationErrors } from "../utils/helpers"
import AuthService from "../services/auth-service"
import emitter from '../lib/emitter'
import Events from "../lib/emitter/events"
import scheduler from "../jobs/scheduler"

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
    const errors = validationResult(req)

    let validatedData = { token: null, email: null }
    let queryParamErrors

    if (!errors.isEmpty()) {
        queryParamErrors = processValidationErrors(errors.array())
    } else {
        validatedData = { ...matchedData(req) }
    }

    res.render('auth/reset-password', {
        title: 'Reset Password',
        queryData: validatedData,
        queryParamErrors
    })
}

export const createAccount = async (req, res, next) => {
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
    try {
        const user = await AuthService.createAccount(data)

        if (!user) {
            throw new Error('Account not created')
        }

        emitter.emit(Events.NEW_USER, user)

        req.flash('info', 'Account created successfully')

        return res.redirect('/auth/login')
    } catch (error) {
        return flashErrorsAndRedirect(req, res, {
            errors: [
                {
                    msg: error.message,
                    path: 'global'
                }
            ],
            formData: req.body
        })
    }
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
    const data = matchedData(req)

    try {
        const user = await AuthService.loginUser(data)

        if (!user) {
            throw new Error('User not logged in')
        }

        req.session.authenticated = true
        req.session.user = user

        return res.redirect('/')
    } catch (error) {
        return flashErrorsAndRedirect(req, res, {
            errors: [
                {
                    msg: error.message,
                    path: 'global'
                }
            ],
            formData: req.body
        })
    }
}

export const forgotPassword = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return flashErrorsAndRedirect(req, res, {
            errors: errors.array(),
            formData: req.body
        })
    }

    const { email } = matchedData(req)

    try {
        const { username, link } = await AuthService.requestPasswordReset(email)

        emitter.emit(Events.PASSWORD_RESET, { username, email, link })

        req.flash('info', 'Password reset link sent. Check your email!')

        res.redirect('back')
    } catch (error) {
        return flashErrorsAndRedirect(req, res, {
            errors: [
                {
                    msg: error.message,
                    path: 'global'
                }
            ],
            formData: req.body
        })
    }
}

export const resetPassword = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return flashErrorsAndRedirect(req, res, {
            errors: errors.array(),
            formData: req.body
        })
    }

    const { email, token, password } = matchedData(req)

    try {
        const isResetPasswordComplete = await AuthService.resetPassword(email, token, password)

        if (isResetPasswordComplete) {
            req.flash('info', 'Password Reset Successfully')

            res.redirect('/auth/login')
        }
    } catch (error) {
        return flashErrorsAndRedirect(req, res, {
            errors: [
                {
                    msg: error.message,
                    path: 'global'
                }
            ],
            formData: req.body
        })
    }
}

export const logout = async (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/auth/login');
    });
}