import express from 'express'
import { createAccount, forgotPassword, login, logout, resetPassword, showCreateAccountPage, showForgotPasswordPage, showLoginPage, showResetPasswordPage } from '../controllers/auth-controller'
import { validateCreateAccount, validateForgotPassword, validateLogin, validateResetPassword, validateResetPasswordQueryParams } from '../middlewares/auth-request-validation'

const router = express.Router()

router.get('/create-account', showCreateAccountPage)

router.get('/login', showLoginPage)

router.get('/forgot-password', showForgotPasswordPage)

router.get('/reset-password', validateResetPasswordQueryParams, showResetPasswordPage)

router.post('/login', validateLogin, login)

router.post('/create-account', validateCreateAccount, createAccount)

router.post('/forgot-password', validateForgotPassword, forgotPassword)

router.post('/reset-password', validateResetPassword, resetPassword)

router.post('/logout', logout)

export default router