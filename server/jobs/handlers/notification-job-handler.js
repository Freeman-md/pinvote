import PollCreatedNotification from '../../notifications/poll-created-notification';
import PollUpdatedNotification from '../../notifications/poll-updated-notification';
import MailService from '../../services/mail-service';

class NotificationJobHandler {
  static async handlePollCreatedJob(job) {
    const { userId, pollId, pollQuestion } = job.attrs.data;

    try {
      await PollCreatedNotification.create(userId, pollId, pollQuestion);
    } catch (error) {
      console.error('Error sending sending notification for poll creation:', error);
    }
  }

  static async handlePollUpdatedJob(job) {
    const { userId, pollId, pollQuestion } = job.attrs.data;

    try {
      await PollUpdatedNotification.create(userId, pollId, pollQuestion);
    } catch (error) {
      console.error('Error sending sending notification for poll creation:', error);
    }
  }
}

export default NotificationJobHandler;
