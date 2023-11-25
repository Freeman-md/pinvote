import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_MAIL_HOST,
      port: process.env.SMTP_MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_MAIL_USER,
        pass: process.env.SMTP_MAIL_PASS,
      },
    });
  }

  async sendMail(options) {
    try {
      await this.transporter.sendMail(options);
    } catch (error) {
      console.error('An error occurred sending mail:', error);
      throw new Error(error);
    }
  }

  async sendHtmlMail(to, subject, html, from = 'freeman@trutech.app') {
    const options = {
      to,
      subject,
      html,
      from,
    };

    await this.sendMail(options);
  }

  async sendTextMail(to, subject, text, from = 'freeman@trutech.app') {
    const options = {
      to,
      subject,
      text,
      from,
    };

    await this.sendMail(options);
  }

  // Example for sending template mails
//   async sendTemplateMail(to, subject, template, context, from = 'freeman@trutech.app') {
//     // Implement your template rendering logic here
//     const renderedHtml = renderTemplate(template, context);

//     const options = {
//       to,
//       subject,
//       html: renderedHtml,
//       from,
//     };

//     await this.sendMail(options);
//   }
}

export default new MailService();
