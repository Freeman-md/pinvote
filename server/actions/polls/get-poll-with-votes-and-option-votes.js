import PollService from "../../services/poll-service";
import VoteService from "../../services/vote-service";

export default class GetPollDetailsWithVotesAndOptionVotesAction {
    static async execute(pollId, userId) {
        const poll = await PollService.getPollDetailsWithUserVotes(pollId)

        const userVote = userId ? await VoteService.findVoteByPollAndUser(pollId, userId) : null
    
        // Count total votes for each option
        const optionVotes = {};
        poll.options.forEach((option) => {
            const votesForOption = poll.votes.filter((vote) => vote.option == option);
    
            optionVotes[option] = {
                count: votesForOption.length
            };
        });
    
        return {
            poll,
            userVote,
            optionVotes
        }
    }
}