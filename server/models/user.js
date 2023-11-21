import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema

const bcryptSalt = process.env.BCRYPT_SALT

const userSchema = new Schema({
    name: {
        first: {
            type: String,
            required: true,
        },
        last: {
            type: String,
            required: true,
        }
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
    polls: [{ type: Schema.Types.ObjectId, ref: 'Poll' }],
    votes: [ { type: Schema.Types.ObjectId, ref: 'Vote' } ]
}, {
    timestamps: true,
    query: {
        byEmail(email) {
            return this.where({ email })
        }
    },
    virtuals: {
        fullName: {
            get() {
                return this.name.first + ' ' + this.name.last;
            }
        }
    },
    
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
    this.password = hash;
    next();
})

const User = mongoose.model('User', userSchema)

export default User