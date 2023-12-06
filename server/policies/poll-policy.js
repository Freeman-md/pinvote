import BasePolicy from "./base-policy";

class PollPolicy extends BasePolicy {
    isUserAuthorizedForPoll(user, pollId) {
        return user.polls.some(userPollId => userPollId.equals(pollId));
    }

    view(user, pollId) {
        return this.isUserAuthorizedForPoll(user, pollId);
    }

    create() {
        return true;
    }

    edit(user, pollId) {
        return this.isUserAuthorizedForPoll(user, pollId);
    }

    update(user, pollId) {
        return this.isUserAuthorizedForPoll(user, pollId);
    }

    delete(user, pollId) {
        return this.isUserAuthorizedForPoll(user, pollId);
    }
}

export default new PollPolicy()