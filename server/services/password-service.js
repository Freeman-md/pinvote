import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import appConfig from '../config/app';
import Token from '../models/token';

class PasswordService {
    static generatePasswordResetToken() {
      return crypto.randomBytes(20).toString('hex');
    }
  
    static async hashPassword(password) {
      const saltRounds = Number(appConfig.env.bcryptSalt);
      return await bcrypt.hash(password, saltRounds);
    }
  
    static async comparePasswords(plainPassword, hashedPassword) {
      return await bcrypt.compare(plainPassword, hashedPassword);
    }

    static async generateAndSaveResetToken(user) {
        // Delete already existing token for the user
        let token = await Token.findOne({ user: user._id });
        if (token) await token.deleteOne();
    
        const resetToken = this.generatePasswordResetToken();
    
        await Token.create({
          user: user._id,
          token: resetToken,
          createdAt: Date.now(),
        });
    
        return resetToken;
      }
    
      static async validateAndDeleteResetToken(user, providedToken) {
        const passwordResetToken = await Token.findOne({ user: user._id });
    
        if (!passwordResetToken || !(await this.comparePasswords(providedToken, passwordResetToken.token))) {
          throw new Error('Invalid or expired password reset token');
        }
    
        await passwordResetToken.deleteOne();
      }
  }

  export default PasswordService