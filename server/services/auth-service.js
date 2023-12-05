import appConfig from '../config/app';
import Token from '../models/token'
import User from '../models/user'

class AuthService {
  static async loginUser({ email, password }) {
    const user = await User.findOne().byEmail(email);

    if (!user) {
      throw new Error('User does not exist');
    }

    const doesPasswordMatch = await PasswordService.comparePasswords(password, user.password);

    if (!doesPasswordMatch) {
      throw new Error('Password is invalid');
    }

    return user;
  }

  static async createAccount({ firstName, lastName, email, password }) {
    const hashedPassword = await PasswordService.hashPassword(password);

    const user = await User.create({
      name: {
        first: firstName,
        last: lastName,
      },
      email,
      password: hashedPassword,
    });

    return {
      user,
    };
  }

  static async requestPasswordReset(email) {
    const user = await User.findOne().byEmail(email);

    if (!user) {
      throw new Error('User does not exist');
    }

    const resetToken = await PasswordService.generateAndSaveResetToken(user);

    const passwordResetLink = `${appConfig.env.appUrl}/auth/reset-password?token=${resetToken}&email=${email}`;

    return {
      username: user.name.first,
      link: passwordResetLink,
    };
  }

  static async resetPassword(email, token, newPassword) {
    const user = await User.findOne().byEmail(email);

    if (!user) {
      throw new Error('User does not exist');
    }

    await PasswordService.validateAndDeleteResetToken(user, token);

    const hashedPassword = await PasswordService.hashPassword(newPassword);

    await User.updateOne(
      { _id: user._id },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    return true;
  }
}

export default AuthService;