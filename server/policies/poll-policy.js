import BasePolicy from "./base-policy";

class PollPolicy extends BasePolicy {
    view(user, poll) {
        return user._id === poll.user._id;
    }

    create() {
        return true;
    }

    edit(user, pollId) {
        return user.polls.some(userPollId => userPollId.equals(pollId))
    }

    update(user, pollId) {
        return user.polls.some(userPollId => userPollId.equals(pollId))        
    }

    delete(user, pollId) {
        return user.polls.some(userPollId => userPollId.equals(pollId))        
    }
}

export default new PollPolicy()