import mongoose from "mongoose";

const Schema = mongoose.Schema

const optionSchema = new Schema({
    poll: {
        types: Schema.Types.ObjectId,
        ref: 'Poll',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    votes: [ { type: Schema.Types.ObjectId, ref: 'Vote' } ]
}, { timestamps: true })

const Option = mongoose.model('Option', optionSchema)

export default Option