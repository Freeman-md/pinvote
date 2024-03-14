import Events from "../../lib/emitter/events";
import PollAboutToStartNotification from "../../notifications/poll-notification";
import PollService from "../../services/poll-service";

class PollJobHandler {
    static async handlePollAboutToStartJob(job) {
        console.log(Events.POLL_ABOUT_TO_START + ' job running')
        
        const polls = await PollService.getPollsAboutToStart()

        try {
            polls.forEach(async (poll) => {
                await PollAboutToStartNotification.createIfNotExists({
                    notificationType: Events.POLL_ABOUT_TO_START,
                    notificationTitle: 'Get Ready! 🕒',
                    notificationMessage: `Poll '${poll.question.substring(0, 10)}...' is about to start. Get ready to vote!`,
                    pollId: poll.id
                })
            })
        } catch (error) {
            console.error('Error sending sending notification for vote casted:', error);
        }
    }

    static async handlePollStartedJob(job) {
        console.log(Events.POLL_STARTED + ' job running')
        // const { pollId, pollQuestion, voterName } = job.attrs.data;

        try {
            // await VoteCastedNotification.create(pollId, pollQuestion, voterName);
        } catch (error) {
            console.error('Error sending sending notification for vote casted:', error);
        }
    }

    static async handlePollAboutToEndJob(job) {
        console.log(Events.POLL_ABOUT_TO_END + ' job running')
        // const { pollId, pollQuestion, voterName } = job.attrs.data;

        try {
            // await VoteCastedNotification.create(pollId, pollQuestion, voterName);
        } catch (error) {
            console.error('Error sending sending notification for vote casted:', error);
        }
    }

    static async handlePollEndedJob(job) {
        console.log(Events.POLL_ENDED + ' job running')

        // const { pollId, pollQuestion, voterName } = job.attrs.data;

        try {
            // await VoteCastedNotification.create(pollId, pollQuestion, voterName);
        } catch (error) {
            console.error('Error sending sending notification for vote casted:', error);
        }
    }
}

export default PollJobHandler;
