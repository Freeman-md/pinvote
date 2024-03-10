import mongoose from "mongoose"

const Schema = mongoose.Schema

const notificationSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    notifiable: {
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
    }
}, {
    timestamps: true,
})

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification