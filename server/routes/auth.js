import express from 'express'
import { createAccount, login, logout, showCreateAccountPage, showForgotPasswordPage, showLoginPage, showResetPasswordPage } from '../controllers/auth-controller'
import { validateCreateAccount, validateLogin } from '../middlewares/form-validators'

const router = express.Router()

router.get('/create-account', showCreateAccountPage)

router.get('/login', showLoginPage)

router.get('/forgot-password', showForgotPasswordPage)

router.get('/reset-password', showResetPasswordPage)

router.post('/login', validateLogin, login)

router.post('/logout', logout)

router.post('/create-account', validateCreateAccount, createAccount)

export default router