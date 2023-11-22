import { matchedData } from "express-validator";
import PollService from "../services/poll-service";

export const index = async (req, res, next) => {
    const polls = await PollService.getAllPollsWithVotes()

    console.log(polls)

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

export const viewVoters = (req, res, next) => {
    let id = req.params.id

    res.render('polls/voters', {
        title: 'PinVote • View Voters',
        id,
    })
}