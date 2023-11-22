import mongoose from "mongoose";

const Schema = mongoose.Schema

const voteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    option: {
        type: Schema.Types.ObjectId,
        ref: 'Option',
        required: true,
    },
    poll: {
        type: Schema.Types.ObjectId
    }
}, { timestamps: true })

const Vote = mongoose.model('Vote', voteSchema)

export default Vote