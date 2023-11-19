import mongoose from "mongoose";

const Schema = mongoose.Schema

const voteSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    optionId: {
        type: Schema.Types.ObjectId,
        ref: 'Option',
        required: true,
    },
})

const Vote = mongoose.model('Vote', voteSchema)

export default Vote