export const index = (req, res, next) => {
    res.render('polls/index', { title: 'PinVote' });
}

export const view = (req, res, next) => {
    let id = req.params.id;
    res.render('polls/view', {
        title: 'PinVote • View',
        id,
    })
}

export const viewVoters = (req, res, next) => {
    let id = req.params.id

    res.render('polls/voters', {
        title: 'PinVote • View Voters',
        id,
    })
}