import PollService from "../services/poll-service";
import { flashErrorsAndRedirect } from "../utils/helpers";

export const index = async (req, res, next) => {
    try {
        const polls = await PollService.getAllPolls()

        res.render('polls/index', { title: 'PinVote', polls });
    } catch (error) {
        return flashErrorsAndRedirect(req, res, {
            error: error.message,
            path: 'global'
        })
    }
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