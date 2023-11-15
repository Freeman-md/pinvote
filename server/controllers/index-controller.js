export const index = (req, res, next) => {
    res.render('index', { title: 'PinVote' });
}

export const view = (req, res, next) => {
    let id = req.params.id;
    res.render('view', {
        title: 'PinVote',
        id,
    })
}