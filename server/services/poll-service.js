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

    static updatePoll = async (id, pollData) => {
        const existingPoll = await Poll.findById(id);

            if (!existingPoll) {
                throw new Error('Poll not found');
            }

            // Update poll fields
            Object.assign(existingPoll, pollData);

            // Update options if provided
            if (pollData.options && pollData.options.length > 0) {
                // Remove existing options
                await Option.deleteMany({ _id: { $in: existingPoll.options } });

                // Create new options
                const createdOptions = await Option.insertMany(
                    pollData.options.map(option => ({ text: option }))
                );

                // Update poll with new option IDs
                existingPoll.options = createdOptions.map(option => option._id);
            }

            // Save the updated poll
            const updatedPoll = await existingPoll.save();

            return updatedPoll;
    }

    static deletePoll = async (id) => {
        return await Poll.findByIdAndDelete(id)
    }
}

export default PollService