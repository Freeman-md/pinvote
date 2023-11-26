// jobs/handlers/mail-job-handler.js
import MailService from '../../services/mail-service';

class MailJobHandler {
  static async sendPasswordResetEmail(job) {
    const { username, email, link } = job.attrs.data;

    try {
      await MailService.sendHtmlMail({
        to: email,
        subject: 'Password Reset',
        template: 'password-reset',
        context: { username, link },
      });
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  }

  static async sendWelcomeEmail(job) {
    const { user } = job.attrs.data;

    try {
      await MailService.sendHtmlMail({
        to: user.email,
        subject: 'Welcome To PinVote',
        template: 'welcome',
        context: { username: user.name.first },
      });
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }
  }
}

export default MailJobHandler;
