import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema

const bcryptSalt = process.env.BCRYPT_SALT

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: String,
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
    this.password = hash;
    next();
})

const User = mongoose.model('User', userSchema)

export default User