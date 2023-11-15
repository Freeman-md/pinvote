export const showRegistrationPage = (req, res, next) => {
    res.render('auth/register', {
        title: 'Register'
    })
}