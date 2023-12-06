import BasePolicy from "./base-policy";

class PollPolicy extends BasePolicy {
    view(user, poll) {
        return user._id === poll.user._id;
    }

    create() {
        return true;
    }

    update(user, pollId) {
        return user.polls.some(userPollId => userPollId.equals(pollId))        
    }

    delete(user) {
        return user._id === poll.user._id;
    }
}

export default new PollPolicy()