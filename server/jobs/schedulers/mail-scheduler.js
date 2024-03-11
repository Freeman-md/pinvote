import agenda from '../../config/agenda';
import Events from '../../lib/emitter/events';

class MailScheduler {
  static async sendPasswordResetMail(data) {
    await agenda.now(Events.PASSWORD_RESET, data);
  }

  static async sendWelcomeEmail(data) {
    await agenda.now(Events.NEW_USER, data);
  }
}

export default MailScheduler;
