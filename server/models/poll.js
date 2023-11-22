import moment from "moment";
import mongoose from "mongoose";

const Schema = mongoose.Schema

const pollSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    startDate: {
        type: Schema.Types.Date,
        required: true,
        get: v => moment(v).fromNow()
    },
    endDate: {
        type: Schema.Types.Date,
        required: false,
        get: v => moment(v).fromNow()
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        required: true,
    },
    options: [ { type: Schema.Types.ObjectId, ref: 'Option' } ]
}, { timestamps: true })

const Poll = mongoose.model('Poll', pollSchema) 

export default Poll