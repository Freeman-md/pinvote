export const index = (req, res, next) => {
    res.render('user/dashboard', {
        title: 'User Dashboard'
    })
}