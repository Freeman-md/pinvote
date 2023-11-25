import MailService from '../services/mail-service';

const JobHandlers = {
  sendPasswordResetEmail: async (job) => {
    const { data } = job.attrs;

    // Utilize MailService to send mails
    try {
      await MailService.sendHtmlMail(data.email, 'Password Reset', `
        <p>You requested a password reset</p>
        <p>Click this <a href="${data.link}">link</a> to set a new password</p>
      `);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      // Handle the error as needed
    }
  },
};

export default JobHandlers;
