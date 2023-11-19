import express from 'express'
import { createAccount, showCreateAccountPage, showForgotPasswordPage, showLoginPage, showResetPasswordPage } from '../controllers/auth-controller'
import { validateCreateAccountForm } from '../middlewares/form-validators'

const router = express.Router()

router.get('/create-account', showCreateAccountPage)

router.get('/login', showLoginPage)

router.get('/forgot-password', showForgotPasswordPage)

router.get('/reset-password', showResetPasswordPage)

router.post('/create-account', validateCreateAccountForm, createAccount)

export default router