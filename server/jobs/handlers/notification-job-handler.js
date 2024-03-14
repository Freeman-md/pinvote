import PollCreatedNotification from '../../notifications/poll-created-notification';
import PollUpdatedNotification from '../../notifications/poll-updated-notification';
import VoteCastedNotification from '../../notifications/vote-casted-notification';

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
      console.error('Error sending sending notification for poll update:', error);
    }
  }

  static async handleVoteCastedJob(job) {
    const { pollId, pollQuestion, voterName } = job.attrs.data;

    try {
      await VoteCastedNotification.create(pollId, pollQuestion, voterName);
    } catch (error) {
      console.error('Error sending sending notification for vote casted:', error);
    }
  }

  static async handlePollAboutToStartJob(job) {
    console.log('handling poll about to start job')
    // const { pollId, pollQuestion, voterName } = job.attrs.data;

    try {
      // await VoteCastedNotification.create(pollId, pollQuestion, voterName);
    } catch (error) {
      console.error('Error sending sending notification for vote casted:', error);
    }
  }

  static async handlePollStartedJob(job) {
    // const { pollId, pollQuestion, voterName } = job.attrs.data;

    try {
      // await VoteCastedNotification.create(pollId, pollQuestion, voterName);
    } catch (error) {
      console.error('Error sending sending notification for vote casted:', error);
    }
  }

  static async handlePollAboutToEndJob(job) {
    // const { pollId, pollQuestion, voterName } = job.attrs.data;

    try {
      // await VoteCastedNotification.create(pollId, pollQuestion, voterName);
    } catch (error) {
      console.error('Error sending sending notification for vote casted:', error);
    }
  }

  static async handlePollEndedJob(job) {
    // const { pollId, pollQuestion, voterName } = job.attrs.data;

    try {
      // await VoteCastedNotification.create(pollId, pollQuestion, voterName);
    } catch (error) {
      console.error('Error sending sending notification for vote casted:', error);
    }
  }
}

export default NotificationJobHandler;
