import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema

const bcryptSalt = process.env.BCRYPT_SALT

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
})

tokenSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.token, Number(bcryptSalt));
    this.token = hash;
    next();
})

const Token = mongoose.model('Token', tokenSchema)

export default Token