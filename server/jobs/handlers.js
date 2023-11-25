import MailService from '../services/mail-service';

const JobHandlers = {
  sendPasswordResetEmail: async (job) => {
    const { username, email, link } = job.attrs.data;

    try {
      await MailService.sendHtmlMail(
        {
          to: email,
          subject: 'Password Reset',
          template: 'password-reset',
          context: {
            username,
            link,
          }
        }
      );
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  },

  sendWelcomeEmail: async (job) => {
    const { user } = job.attrs.data;

    try {
      await MailService.sendHtmlMail(
        {
          to: user.email,
          subject: 'Welcome To PinVote',
          template: 'welcome',
          context: {
            username: user.name.first,
          }
        }
      );
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }
  },
};

export default JobHandlers;
