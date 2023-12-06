import { matchedData, validationResult } from "express-validator"
import VoteService from "../services/vote-service"

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
                message: 'Error recording vote'
            })
        }

        try {
            const { id: pollId, option } = matchedData(req)

            await VoteService.recordVote(req.session?.user?._id, pollId, option)

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