import { matchedData, validationResult } from "express-validator"
import VoteService from "../services/vote-service"

export const vote = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.json({
            error: error.message
        })
    }

    try {
        const { pollId, optionId } = matchedData(req)

        VoteService.recordVote(req.session.user._id, pollId, optionId)

        res.status(200).json({
            message: 'Vote recorded successfully'
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}