import crypto from 'crypto'
import bcrypt from 'bcryptjs'

import { UserService } from './user-service'
import Token from '../models/token'
import User from '../models/user'

const bcryptSalt = process.env.BCRYPT_SALT

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

    static resetPassword = async (email, token, password) => {
        const user = await UserService.findUserByEmail(email)

        const passwordResetToken = await Token.findOne({ userId: user._id });

        if (!passwordResetToken) {
          throw new Error("Invalid or expired password reset token");
        }

        const isValid = await bcrypt.compare(token, passwordResetToken.token);

        if (!isValid) {
          throw new Error("Invalid or expired password reset token");
        }

        const hash = await bcrypt.hash(password, Number(bcryptSalt));

        await User.updateOne(
          { _id: user._id },
          { $set: { password: hash } },
          { new: true }
        );

        await passwordResetToken.deleteOne();

        return true;
      };
}