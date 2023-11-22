import { matchedData, validationResult } from "express-validator"
import { flashErrorsAndRedirect } from "../utils/helpers"
import PollService from "../services/poll-service"
import moment from "moment"

export const index = async (req, res, next) => {
    try {
        const polls = await PollService.getUserPolls(req.session.user._id)

        res.render('user/polls', {
            title: 'My Polls',
            polls
        })
    } catch (error) {
        console.log(error)
        return flashErrorsAndRedirect(req, res, {
            error: error.message,
            path: 'global'
        })
    }
}

export const create = (req, res, next) => {

    res.render('user/polls/create', {
        title: 'My Polls • Create'
    })
}

export const edit = async (req, res, next) => {
    const { id } = matchedData(req)

    if (!res.locals.formData) {
        const poll = await PollService.getPollDetails(id)

        res.locals.formData = {
            ...poll._doc,
            startDate: moment(poll._doc.startDate).format('YYYY-MM-DD'),
            endDate: moment(poll._doc.endDate).format('YYYY-MM-DD')
        }
    }

    res.render('user/polls/edit', {
        title: 'My Polls • Edit',
        id,
    })
}

export const store = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return flashErrorsAndRedirect(req, res, {
            errors: errors.array(),
            formData: req.body
        })
    }

    const data = matchedData(req)

    try {
        await PollService.createPoll({ ...data, user: req.session.user._id })

        req.flash('info', 'Poll created successfully')

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

export const update = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return flashErrorsAndRedirect(req, res, {
            errors: errors.array(),
            formData: req.body
        })
    }

    const data = matchedData(req)

    const { id: pollId, startDate, ...poll } = data

    try {
        await PollService.updatePoll(pollId, poll)

        req.flash('info', `Poll "${poll.question.substring(0, 10)}..." updated successfully`)

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

export const deletePoll = async (req, res, next) => {
    const { id } = matchedData(req)

    try {
        await PollService.deletePoll(id)

        req.flash('info', `Poll deleted successfully`)

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