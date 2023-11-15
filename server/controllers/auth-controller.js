export const showCreateAccountPage = (req, res, next) => {
    res.render('auth/create-account', {
        title: 'Create an account'
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