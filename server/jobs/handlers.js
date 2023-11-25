import MailService from '../services/mail-service';

const JobHandlers = {
  sendPasswordResetEmail: async (job) => {
    const { username, email, link } = job.attrs.data;

    // Utilize MailService to send mails
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
      // Handle the error as needed
    }
  },
};

export default JobHandlers;
