import { matchedData, validationResult } from "express-validator"
import VoteService from "../services/vote-service"

export const vote = (req, res, next) => {
    const errors = validationResult(req)

    console.log('errors', errors)

    if (!errors.isEmpty()) {
        return res.status(500).json({
            message: 'Error recording vote'
        })
    }

    try {
        const { id: pollId, option } = matchedData(req)

        VoteService.recordVote(req.session.user._id, pollId, option)

        return res.status(200).json({
            message: 'Vote recorded successfully'
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}