import moment from "moment";
import Poll from "../models/poll"
import VoteService from "./vote-service"

class PollService {
    static POLL_START_THRESHOLD = 60; // 60 minutes (1 hour) before the poll starts
    static POLL_END_THRESHOLD = 60; // 60 minutes (1 hour) before the poll ends

    static getSortedPollsQuery = (searchTerm = '') => Poll.find({
        question: new RegExp(searchTerm, 'i'),
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

    static getAllPollsWithVotes = async (searchTerm) => {
        return await this.getSortedPollsQuery(searchTerm).populate('user').populate('votes');
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

    static checkPollsAboutToStart = async () => {
        // Calculate the current time and the upper limit time
        const currentTime = moment();
        const upperLimitTime = moment().add(this.POLL_START_THRESHOLD, 'minutes');

        // Query for polls that are about to start within the threshold
        const pollsAboutToStart = await Poll.find({
            startDate: {
                $gt: currentTime.toDate(), // Greater than current time
                $lte: upperLimitTime.toDate() // And less than or equal to the upper limit time
            },
            visibility: 'public'
        }).populate('user');

        return pollsAboutToStart;
    }
}

export default PollService