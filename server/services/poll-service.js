import Poll from "../models/poll"
import VoteService from "./vote-service"

class PollService {
    static getSortedPollsQuery = () => Poll.find().sort({ createdAt: -1 });

    static getUserPolls = async (id) => {
        return await Poll.find({ user: id }).sort({ createdAt: -1 });
    }

    static getAllPolls = async () => {
        return await this.getSortedPollsQuery().populate('user');
    }

    static getAllPollsWithVotes = async () => {
        return await this.getSortedPollsQuery().populate('user').populate('votes');
    }

    static getPollDetails = async (id) => {
        return await Poll.findById(id).populate('user')
    }

    static getPollDetailsWithVotes = async (id) => {
        return await Poll.findById(id).populate('user').populate('votes')
    }

    static getPollDetailsWithUserVotes = async (id) => {
        return await Poll.findById(id).populate('user').populate({
            path: 'votes',
            populate: {
                path: 'user'
            }
        })
    }

    static getPollDetailsWithVotesAndOptionVotes = async (pollId, userId) => {
        const poll = await this.getPollDetailsWithUserVotes(pollId)

        const userVote = userId ? await VoteService.findVoteByPollAndUser(pollId, userId) : null

        // Count total votes for each option
        const optionVotes = {};
        poll.options.forEach((option) => {
            const votesForOption = poll.votes.filter((vote) => vote.option == option);

            optionVotes[option] = {
                count: votesForOption.length
            };
        });

        return {
            poll,
            userVote,
            optionVotes
        }
    }

    static createPoll = async (data) => {
        return await Poll.create(data)
    }

    static updatePoll = async (id, poll) => {
        return await Poll.findByIdAndUpdate(id, poll)
    }

    static deletePoll = async (id) => {
        return await Poll.findByIdAndDelete(id)
    }
}

export default PollService