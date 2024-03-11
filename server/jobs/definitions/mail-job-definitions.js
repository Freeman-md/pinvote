import Events from '../../lib/emitter/events';
import MailJobHandler from '../handlers/mail-job-handler';

class MailJobDefinitions {
  static defineJobs(agenda) {
    agenda.define(Events.PASSWORD_RESET, MailJobHandler.sendPasswordResetEmail);
    agenda.define(Events.NEW_USER, MailJobHandler.sendWelcomeEmail);
  }
}

export default MailJobDefinitions;
