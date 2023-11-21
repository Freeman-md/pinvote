import Poll from "../models/poll"

class PollService {
    static getUserPolls = async (id) => {
        return await Poll.find({user: id}).sort({ createdAt: -1 })
    }

    static getAllPolls = async () => {
        return await Poll.find().sort({ createdAt: -1 }).populate('user')
    }

    static getPollDetails = async (id) => {
        return await Poll.findById(id).populate('user')
    }

    static createPoll = async (data) => {
        return await Poll.create(data)
    }

    static updatePoll = async (pollId, poll) => {
        return await Poll.findByIdAndUpdate(pollId, poll)
    }
}

export default PollService