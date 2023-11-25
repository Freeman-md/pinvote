import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()


const transporter = nodemailer.createTransport(
  {
    host: process.env.SMTP_MAIL_HOST,
    port: process.env.SMTP_MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_MAIL_USER,
      pass: process.env.SMTP_MAIL_PASS,
    },
  }
)

const sendHtmlMail = async (to, subject, html) => {
  try {
    
    await transporter.sendMail({
      to,
      subject,
      html,
      from: 'freeman@trutech.app',
    })
  
  } catch (error) {
    console.log('An error has occurred sending mail: ', error)

    throw new Error(error)
  }
}

export { sendHtmlMail }