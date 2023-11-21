import Poll from "../models/poll"

class PollService {
    static createPoll = async (data) => {
        await Poll.create(data)
    }

    static getUserPolls = async (id) => {
        return await Poll.find().where({ userId: id })
    }
}

export default PollService