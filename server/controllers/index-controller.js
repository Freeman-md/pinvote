import { matchedData, validationResult } from "express-validator";

import { flashErrorsAndRedirect } from "../utils/helpers"
import PollService from "../services/poll-service";
import VoteService from "../services/vote-service";

export const index = async (req, res, next) => {
    const polls = await PollService.getAllPollsWithVotes()


    res.render('polls/index', { title: 'PinVote', polls });
}

export const view = async (req, res, next) => {
    const { id: pollId } = matchedData(req)

    const { poll, userVote, optionVotes } = await PollService.getPollDetailsWithVotesAndOptionVotes(pollId, req.session.user._id)

    res.render('polls/view', {
        title: 'PinVote • View',
        poll,
        userVote,
        optionVotes
    })
}

export const viewVoters = async (req, res, next) => {
    const errors = validationResult(req)
    

    if (!errors.isEmpty()) {
        return flashErrorsAndRedirect(req, res, {
            errors: errors.array(),
            formData: {}
        })
    }

    try {
        const { id: pollId } = matchedData(req)

        const votesByOption = await VoteService.getPollVotesWithUserData(pollId)

        res.render('polls/voters', {
            title: 'PinVote • View Voters',
            votesByOption,
        })
    } catch (error) {
        throw new Error(error.message)
    }
}