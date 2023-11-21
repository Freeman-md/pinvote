import mongoose from "mongoose";

const Schema = mongoose.Schema

const optionSchema = Schema({
    pollId: {
        types: Schema.Types.ObjectId,
        ref: 'Poll',
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
}, { timestamps: true })

const Option = mongoose.model('Option', optionSchema)

export default Option