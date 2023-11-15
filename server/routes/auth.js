import express from 'express'
import { showCreateAccountPage, showForgotPasswordPage, showLoginPage, showResetPasswordPage } from '../controllers/auth-controller'

const router = express.Router()

router.get('/register', showCreateAccountPage)

router.get('/login', showLoginPage)

router.get('/forgot-password', showForgotPasswordPage)

router.get('/reset-password', showResetPasswordPage)

export default router