import BasePolicy from "./base-policy";

class PollPolicy extends BasePolicy {
    view(user, poll) {
        return user._id === poll.user._id;
    }

    create() {
        return true;
    }

    update(user, poll) {
        return user._id === poll.user._id;
    }

    delete(user) {
        return user._id === poll.user._id;
    }
}

export default PollPolicy