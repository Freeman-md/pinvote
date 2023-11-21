import mongoose from "mongoose";

const Schema = mongoose.Schema

const pollSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    options: {
        type: Schema.Types.Array,
        required: true,
    },
    startDate: {
        type: Schema.Types.Date,
        required: true,
    },
    endDate: {
        type: Schema.Types.Date,
        required: false,
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        required: true,
    }
}, { timestamps: true })

const Poll = mongoose.model('Poll', pollSchema) 

export default Poll