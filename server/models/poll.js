import moment from "moment";
import mongoose from "mongoose";
import User from "./user";
import UserService from "../services/user-service";

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
    options: {
        type: Schema.Types.Array,
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
    votes: [{ type: Schema.Types.ObjectId, ref: 'Vote' }]
}, {
    timestamps: true,
})

pollSchema.post('save', async function (doc, next) {
    try {
        await UserService.addPollToUser(doc.user, doc._id);
        next();
    } catch (error) {
        next(error);
    }
});

pollSchema.pre("remove", async function (next) {
    try {
        await UserService.removePollFromUser(this.user, this._id);
        next();
    } catch (error) {
        next(error);
    }
});

const Poll = mongoose.model('Poll', pollSchema)

export default Poll