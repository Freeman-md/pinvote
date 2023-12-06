import { matchedData, validationResult } from "express-validator";

import { flashErrorsAndRedirect } from "../utils/helpers"
import PollService from "../services/poll-service";
import VoteService from "../services/vote-service";

class IndexController {
    index = async (req, res, next) => {
        const polls = await PollService.getAllPollsWithVotes()
    
    
        res.render('polls/index', { title: 'PinVote', polls });
    }
    
    view = async (req, res, next) => {
        const { id: pollId } = matchedData(req)
    
        const { poll, userVote, optionVotes } = await PollService.getPollDetailsWithVotesAndOptionVotes(pollId, req.session?.user?._id)
    
        res.render('polls/view', {
            title: 'PinVote • View',
            poll,
            userVote,
            optionVotes
        })
    }
}

export default new IndexController()