import Poll from "../models/poll"
import User from "../models/user"
import Vote from "../models/vote";

class VoteService {
    static recordVote = async (userId, pollId, option) => {
        // Find the poll, user, and existing vote
        const [poll, user, existingVote] = await Promise.all([
            Poll.findById(pollId),
            User.findById(userId),
            Vote.findOneAndDelete({ user: userId, poll: pollId }),
        ]);

        if (!poll || !user) {
            throw new Error('Poll or user not found');
        }

        // Remove existing vote from user and poll
        if (existingVote) {
            user.votes.pull(existingVote._id);
            poll.votes.pull(existingVote._id);
            await Promise.all([user.save(), poll.save()]);
        }

        // Create a new vote
        const newVote = await Vote.create({
            user: userId,
            poll: pollId,
            option,
        });

        // Add the new vote to user and poll
        user.votes.push(newVote._id);
        poll.votes.push(newVote._id);
        await Promise.all([user.save(), poll.save()]);

        return true;
    }
}

export default VoteService