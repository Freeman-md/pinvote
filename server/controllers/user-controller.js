export const index = (req, res, next) => {
    res.render('user/polls', {
        title: 'My Polls'
    })
}

export const create = (req, res, next) => {
    res.render('user/polls/create', {
        title: 'My Polls • Create'
    })
}