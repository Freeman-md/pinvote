import { matchedData, validationResult } from "express-validator";

import { flashErrorsAndRedirect } from "../utils/helpers"
import PollService from "../services/poll-service";
import VoteService from "../services/vote-service";
import GetPollDetailsWithVotesAndOptionVotesAction from "../actions/polls/get-poll-with-votes-and-option-votes";

class IndexController {
    index = async (req, res, next) => {
        const polls = await PollService.getAllPollsWithVotes()
    
    
        res.render('polls/index', { title: 'PinVote', polls });
    }
    
    view = async (req, res, next) => {
        const { id: pollId } = matchedData(req)
        const userId = req.session?.user?._id

        const { poll, userVote, optionVotes } = await GetPollDetailsWithVotesAndOptionVotesAction.execute(pollId, userId)
    
        res.render('polls/view', {
            title: 'PinVote • View',
            poll,
            userVote,
            optionVotes
        })
    }
}

export default new IndexController()