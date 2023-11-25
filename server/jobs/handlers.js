import { sendHtmlMail } from "../utils/mail";

const JobHandlers = {
    sendPasswordResetEmail: async (job) => {
        const { data } = job.attrs
    
        // utilize mailservice to send mails (later on)
    
        await sendHtmlMail(data.email, 'Password Reset', `
                    <p>You requested a password reset</p>
                    <p>Click this <a href="${data.link}">link</a> to set a new password</p>
                `);
    }
}

export default JobHandlers