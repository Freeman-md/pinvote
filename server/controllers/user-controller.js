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

export const edit = (req, res, next) => {
    let id = req.params.id;

    res.render('user/polls/edit', {
        title: 'My Polls • Edit',
        id,
    })
}