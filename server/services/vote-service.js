import { ObjectId } from "mongoose/lib/types";
import Poll from "../models/poll"
import User from "../models/user"
import Vote from "../models/vote";
import PollService from "./poll-service";

class VoteService {
  static findVoteByPollAndUser = async (pollId, userId) => {
    return await Vote.findOne().byPollAndUser(pollId, userId);
  }

  static getPollVotesWithUserData = async (pollId) => {
    return await Vote.aggregate([
      {
        $match: { poll: new ObjectId(pollId) }
      },
      {
        $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' }
      },
      {
        $unwind: { path: '$user', preserveNullAndEmptyArrays: true }
      },
      {
        $group: {
          _id: '$option', // Group by the option
          votes: {
            $push: {
              _id: '$_id',
              user: {
                $cond: {
                  if: { $eq: ['$user', null] },
                  then: null,
                  else: {
                    _id: '$user._id',
                    name: '$user.name.first',
                  },
                },
              },
              updatedAt: '$updatedAt',
            },
          },
        },
      },
    ]);
  };


  static recordVoteForUser = async (userId, pollId, option) => {
    // Find the poll, user, and existing vote
    const [poll, user, existingVote] = await Promise.all([
      Poll.findById(pollId),
      User.findById(userId),
      Vote.findOneAndDelete({ user: userId, poll: pollId }),
    ]);

    if (!poll) {
      throw new Error('Poll not found');
    }

    if (!user) {
      throw new Error('User not found');
    }

    // Remove existing vote from user and poll
    if (existingVote) {
      user.votes.pull(existingVote._id);
      poll.votes.pull(existingVote._id);
      await Promise.all([user.save(), poll.save()]);
    }

    // Create a new vote
    const newVote = await Vote.create({
      user: userId,
      poll: pollId,
      option,
    });

    // Add the new vote to user and poll
    user.votes.push(newVote._id);
    poll.votes.push(newVote._id);
    await Promise.all([user.save(), poll.save()]);

    return true;
  }

  static recordAnonymousVote = async (pollId, option) => {
    // Create a new vote
    const newVote = await Vote.create({
      poll: pollId,
      option,
    });

    await Poll.findByIdAndUpdate(pollId, { $push: { votes: newVote._id } });;

    return true;
  }

  static recordVote = async (userId, pollId, option) => {
    if (userId) {
      return await this.recordVoteForUser(userId, pollId, option)
    } else {
      return await this.recordAnonymousVote(pollId, option)
    }
  }
}

export default VoteService