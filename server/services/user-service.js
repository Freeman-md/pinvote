import mongoose from "mongoose";
import User from "../models/user";

class UserService {

    static async addPollToUser(userId, pollId) {
        await User.findByIdAndUpdate(userId, { $push: { polls: pollId } });
    }

    static async removePollFromUser(userId, pollId) {
        await User.findByIdAndUpdate(userId, { $pull: { polls: pollId } });
    }

    static async addPollToActiveUser(req, pollId) {
        req.session.user.polls.push(new mongoose.Types.ObjectId(pollId))
    }

    static async removePollFromActiveUser(req, pollId) {
        req.session.user.polls = req.session.user.polls.filter(id => !id.equals(new mongoose.Types.ObjectId(pollId)))
    }
}

export default UserService