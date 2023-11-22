import mongoose from "mongoose";

const Schema = mongoose.Schema

const voteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    poll: {
        type: Schema.Types.ObjectId,
        ref: 'Poll',
        required: true,
    },
    option: {
        type: String,
        required: true,
    }
}, { 
    timestamps: true,
    query: {
        byPoll(pollId) {
            return this.where({ poll: pollId })
        },
        byUser(userId) {
            return this.where({ user: userId })
        },
        byPollAndUser(pollId, userId) {
            return this.where({ poll: pollId, user: userId })
        }
    },
 })

const Vote = mongoose.model('Vote', voteSchema)

export default Vote