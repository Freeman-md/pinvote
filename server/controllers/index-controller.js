import { matchedData } from "express-validator";
import PollService from "../services/poll-service";

export const index = async (req, res, next) => {
    const polls = await PollService.getAllPolls()

    res.render('polls/index', { title: 'PinVote', polls });
}

export const view = async (req, res, next) => {
    const { id } = matchedData(req)

    const poll = await PollService.getPollDetails(id)

    res.render('polls/view', {
        title: 'PinVote • View',
        poll,
    })
}

export const viewVoters = (req, res, next) => {
    let id = req.params.id

    res.render('polls/voters', {
        title: 'PinVote • View Voters',
        id,
    })
}