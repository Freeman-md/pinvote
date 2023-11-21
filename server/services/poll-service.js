import Poll from "../models/poll"

class PollService {
    static createPoll = async (data) => {
        await Poll.create(data)
    }
}

export default PollService