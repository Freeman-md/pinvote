import moment from "moment";
import Poll from "../models/poll"
import VoteService from "./vote-service"

class PollService {
    static getSortedPollsQuery = () => Poll.find({
        $or: [
            { endDate: { $exists: false } },
            { endDate: { $gt: moment().toDate() } }
        ]
    }).sort({ createdAt: -1 });

    static getUserPolls = async (id) => {
        return await Poll.find({
            user: id,
            
        }).sort({ createdAt: -1 });
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