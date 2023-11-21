export const isAuth = (req, res, next) => {
    if (req.originalUrl.includes('auth') && !req.path.includes('logout')) {
        if (req.session.authenticated) {
            return res.redirect('/')
        }

        return next()
    }

    if (!req.session.authenticated && !req.session.user) {
        return res.redirect('/auth/login')
    }

    next()
}