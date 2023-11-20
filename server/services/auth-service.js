import crypto from 'crypto'
import { UserService } from './user-service'
import Token from '../models/token'

export class AuthService {
    static generatePasswordResetToken = () => {
        return crypto.randomBytes(20).toString("hex")
    }

    static requestPasswordReset = async (email) => {
        const user = await UserService.findUserByEmail(email)

        if (!user) throw new Error('User does not exist')

        // delete already existing token for user
        let token = await Token.findOne({ userId: user._id });
        if (token) await token.deleteOne();

        const resetToken = this.generatePasswordResetToken()

        await Token.create({
            userId: user._id,
            token: resetToken,
            createdAt: Date.now()
        })

        const passwordResetLink = `${process.env.APP_URL}/auth/reset-password?token=${resetToken}&email=${email}`

        return passwordResetLink
    }
}