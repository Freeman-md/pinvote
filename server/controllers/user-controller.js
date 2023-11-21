import { matchedData, validationResult } from "express-validator"
import { flashErrorsAndRedirect } from "../utils/helpers"

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

export const store = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return flashErrorsAndRedirect(req, res, {
            errors: errors.array(),
            formData: req.body
        })
    }

    const data = matchedData(req)

    try {
        res.redirect('/user/polls')
    } catch (error) {
        return flashErrorsAndRedirect(req, res, {
            errors: [
                {
                    msg: error.message,
                    path: 'global'
                }
            ],
            formData: req.body
        })
    }
}