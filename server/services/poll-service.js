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

    static updatePoll = async (id, poll) => {
        return await Poll.findByIdAndUpdate(id, poll)
    }

    static deletePoll = async (id) => {
        return await Poll.findByIdAndDelete(id)
    }
}

export default PollService