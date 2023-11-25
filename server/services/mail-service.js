import path from 'path'

import nodemailer from 'nodemailer';
import nodemailerExpressHandlebars from 'nodemailer-express-handlebars';
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

    // Set up nodemailer-express-handlebars
    this.transporter.use('compile', nodemailerExpressHandlebars({
      viewEngine: {
        defaultLayout: 'main',
        layoutsDir: path.resolve('./views/emails/layouts/'),
        partialsDir: path.resolve('./views/emails/partials/'),
      },
      viewPath: path.resolve('./views/emails/'),
    }));
  }

  async sendMail(options) {
    try {
      await this.transporter.sendMail(options);
    } catch (error) {
      console.error('An error occurred sending mail:', error);
      throw new Error(error);
    }
  }

  async sendHtmlMail({ to, subject, template, context, from = 'freeman@trutech.app' }) {
    const options = {
      to,
      subject,
      template,
      from,
      context: {
        ...context,
        title: subject
      }
    };

    await this.sendMail(options);
  }

  async sendTextMail({to, subject, text, from = 'freeman@trutech.app'}) {
    const options = {
      to,
      subject,
      text,
      from,
    };

    await this.sendMail(options);
  }
}

export default new MailService();
