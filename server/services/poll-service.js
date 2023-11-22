import Option from "../models/option"
import Poll from "../models/poll"

class PollService {
    static getUserPolls = async (id) => {
        return await Poll.find({user: id}).sort({ createdAt: -1 })
    }

    static getAllPolls = async () => {
        return await Poll.find().sort({ createdAt: -1 }).populate('user')
    }

    static getPollDetails = async (id) => {
        return await Poll.findById(id).populate('user').populate('options')
    }

    static createPoll = async (data) => {
        const { options, ...pollData } = data;

        // Create options
        const optionDocuments = options.map(option => ({ text: option }));
        const createdOptions = await Option.insertMany(optionDocuments);

        // Extract option IDs
        const optionIds = createdOptions.map(option => option._id);

        // Add option IDs to poll data
        const pollDataWithOptions = { ...pollData, options: optionIds };

        // Create poll
        const createdPoll = await Poll.create(pollDataWithOptions);

        return createdPoll;
    }

    static updatePoll = async (id, poll) => {
        return await Poll.findByIdAndUpdate(id, poll)
    }

    static deletePoll = async (id) => {
        return await Poll.findByIdAndDelete(id)
    }
}

export default PollService