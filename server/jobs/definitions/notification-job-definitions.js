import Events from '../../lib/emitter/events';
import NotificationJobHandler from '../handlers/notification-job-handler';

class NotificationJobDefinitions {
  static defineJobs(agenda) {
    agenda.define(Events.POLL_CREATED, NotificationJobHandler.handlePollCreatedJob);
    agenda.define(Events.POLL_UPDATED, NotificationJobHandler.handlePollUpdatedJob)
  }
}

export default NotificationJobDefinitions;
