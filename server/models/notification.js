import mongoose from "mongoose"

const Schema = mongoose.Schema

const notificationSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    data: {
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        }
    },
    entity: {
        id: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: 'type'
        },
        type: {
            type: String,
            required: true,
            enum: ['Poll']
        }
    },
    read_at: {
        type: Schema.Types.Date,
        required: false,
        default: null
    }
}, {
    timestamps: true,
})

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification