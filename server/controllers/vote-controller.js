import { matchedData, validationResult } from "express-validator"
import VoteService from "../services/vote-service"

class VoteController {
    async vote(req, res, next) {
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