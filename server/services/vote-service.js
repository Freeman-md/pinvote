import Poll from "../models/poll"
import Vote from "../models/vote";

class VoteService {
    static recordVote = async (userId, pollId, optionId) => {
        // const poll = Poll.findById(pollId)
        // const option = Option.findById(optionId)

        if (!poll || !option) {
            throw new Error('Poll or option not found');
        }

        // Check if the user has already voted for this poll
        const existingVote = await Vote.findOneAndDelete({ user: userId, option: optionId });

        // Create a new vote document
        const newVote = await Vote.create({
            user: userId,
            option: optionId,
        });

        console.log(newVote)

        return true
    }
}

export default VoteService