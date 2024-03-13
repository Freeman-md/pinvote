import { matchedData, validationResult } from "express-validator"
import VoteService from "../services/vote-service"
import PollService from "../services/poll-service"
import Events from "../lib/emitter/events"
import emitter from '../lib/emitter';

class VoteController {
    view = async (req, res, next) => {
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
                pollId,
                votesByOption,
            })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    vote = async (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(500).json({
                message: errors.errors.length > 0 ? errors.errors[0].msg : 'Error recording vote'
            })
        }

        try {
            const { id: pollId, option } = matchedData(req)

            const poll = await PollService.getPollDetails(pollId)

            await VoteService.recordVote(req.session?.user?._id, pollId, option)

            emitter.emit(Events.VOTE_CASTED, {
                pollId: poll.id,
                pollQuestion: poll.question,
                voterName: req.session?.user?.name.first,
            });

            return res.status(201).json({
                message: 'Vote recorded successfully'
            })

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }
}

export default new VoteController();