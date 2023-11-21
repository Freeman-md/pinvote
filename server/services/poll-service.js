import Poll from "../models/poll"

class PollService {
    static createPoll = async (data) => {
        await Poll.create(data)
    }

    static getUserPolls = async (id) => {
        return await Poll.find().where({ user: id })
    }

    static getAllPolls = async () => {
        return await Poll.find().populate('user')
    }
}

export default PollService