export const isAuth = (req, res, next) => {
    if (!req.session.authenticated && !req.session.user) {
        return res.redirect('/auth/login')
    }

    next()
}