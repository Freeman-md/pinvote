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
    },
    endDate: {
        type: Schema.Types.Date,
        required: false,
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        required: true,
    },
    votes: [{ type: Schema.Types.ObjectId, ref: 'Vote' }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

pollSchema.virtual('startsAt').get(function() {
    return moment(this.startDate).fromNow();
});

pollSchema.virtual('endsAt').get(function() {
    return this.endDate ? moment(this.endDate).fromNow() : 'No end date';
});

pollSchema.virtual('status').get(function() {
    const now = moment();
    
    const hasStarted = now.isSameOrAfter(this.startDate);
    
    const hasEnded = this.endDate && now.isSameOrAfter(this.endDate);

    if (hasEnded) {
        return 'ended';
    } else if (hasStarted) {
        return 'active';
    } else {
        return 'inactive';
    }
});

pollSchema.post('save', async function (doc, next) {
    try {
        await UserService.addPollToUser(doc.user, doc._id);
        next();
    } catch (error) {
        next(error);
    }
});

pollSchema.pre("findOneAndDelete", async function (next) {
    console.log('pre deleting one')
    try {
        console.log('removing poll')
        await UserService.removePollFromUser(this.user, this._id);
        next();
    } catch (error) {
        next(error);
    }
});

const Poll = mongoose.model('Poll', pollSchema)

export default Poll