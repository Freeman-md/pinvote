import express from 'express';
import AuthValidator from '../requests/auth-validator';
import AuthController, {
  createAccount,
  forgotPassword,
  login,
  logout,
  resetPassword,
  showCreateAccountPage,
  showForgotPasswordPage,
  showLoginPage,
  showResetPasswordPage
} from '../controllers/auth-controller';

const router = express.Router();

router.get('/create-account', AuthController.showCreateAccountPage);

router.get('/login', AuthController.showLoginPage);

router.get('/forgot-password', AuthController.showForgotPasswordPage);

router.get('/reset-password', AuthValidator.resetPasswordQueryParams, AuthController.showResetPasswordPage);

router.post('/login', AuthValidator.login, AuthValidator.validate, AuthController.login);

router.post('/create-account', AuthValidator.createAccount, AuthValidator.validate, AuthController.createAccount);

router.post('/forgot-password', AuthValidator.forgotPassword, AuthValidator.validate, AuthController.forgotPassword);

router.post('/reset-password', AuthValidator.resetPassword, AuthValidator.validate, AuthController.resetPassword);

router.post('/logout', AuthController.logout);

export default router;
