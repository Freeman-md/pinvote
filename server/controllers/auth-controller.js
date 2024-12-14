import { matchedData } from 'express-validator';
import { flashErrorsAndRedirect, processValidationErrors } from '../utils/helpers';
import AuthService from '../services/auth-service';
import emitter from '../lib/emitter';
import Events from '../lib/emitter/events';

class AuthController {
  showCreateAccountPage = (req, res, next) => {
    res.render('auth/create-account', {
      title: 'Create an account',
    });
  };

  showLoginPage = (req, res, next) => {
    res.render('auth/login', {
      title: 'Login',
    });
  };

  showForgotPasswordPage = (req, res, next) => {
    res.render('auth/forgot-password', {
      title: 'Forgot Password',
    });
  };

  showResetPasswordPage = (req, res, next) => {
    const validatedData = matchedData(req);

    res.render('auth/reset-password', {
      title: 'Reset Password',
      queryData: validatedData,
      queryParamErrors: processValidationErrors([]), // Empty array since validation is already done
    });
  };

  createAccount = async (req, res, next) => {
    const data = matchedData(req);

    try {
      const user = await AuthService.createAccount(data);

      if (!user) {
        throw new Error('Account not created');
      }

      // emitter.emit(Events.NEW_USER, user);

      req.flash('info', 'Account created successfully');

      res.redirect('/auth/login');
    } catch (error) {
      flashErrorsAndRedirect(req, res, {
        errors: [
          {
            msg: error.message,
            path: 'global',
          },
        ],
        formData: req.body,
      });
    }
  };

  login = async (req, res, next) => {
    const data = matchedData(req);

    try {
      const user = await AuthService.loginUser(data);

      if (!user) {
        throw new Error('User not logged in');
      }

      req.session.authenticated = true;
      req.session.user = user;

      res.redirect('/');
    } catch (error) {
      flashErrorsAndRedirect(req, res, {
        errors: [
          {
            msg: error.message,
            path: 'global',
          },
        ],
        formData: req.body,
      });
    }
  };

  forgotPassword = async (req, res, next) => {
    const { email } = matchedData(req);

    try {
      const { username, link } = await AuthService.requestPasswordReset(email);

      // emitter.emit(Events.PASSWORD_RESET, { username, email, link });

      req.flash('info', 'Password reset link sent. Check your email!');

      res.redirect('back');
    } catch (error) {
      flashErrorsAndRedirect(req, res, {
        errors: [
          {
            msg: error.message,
            path: 'global',
          },
        ],
        formData: req.body,
      });
    }
  };

  resetPassword = async (req, res, next) => {
    const { email, token, password } = matchedData(req);

    try {
      const isResetPasswordComplete = await AuthService.resetPassword(email, token, password);

      if (isResetPasswordComplete) {
        req.flash('info', 'Password Reset Successfully');

        res.redirect('/auth/login');
      }
    } catch (error) {
      flashErrorsAndRedirect(req, res, {
        errors: [
          {
            msg: error.message,
            path: 'global',
          },
        ],
        formData: req.body,
      });
    }
  };

  logout = async (req, res, next) => {
    req.session.destroy((err) => {
      console.log(err);
      res.redirect('/auth/login');
    });
  };
}

export default new AuthController();
