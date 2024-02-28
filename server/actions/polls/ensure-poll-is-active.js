import PollService from "../../services/poll-service";

class EnsurePollIsActive {
    static async execute (pollId) {
        const poll = await PollService.getPollDetails(pollId);
        const status = poll.status

        if (status === 'ended') {
            throw new Error('Poll has ended')
        } else if (status === 'inactive') {
            throw new Error('Poll has not started yet. Stay tuned.')
        }

        return true
    }
}

export default EnsurePollIsActive