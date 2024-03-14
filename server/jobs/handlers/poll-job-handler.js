import Events from "../../lib/emitter/events";
import PollAboutToStartNotification from "../../notifications/poll-notification";
import PollService from "../../services/poll-service";

class PollJobHandler {
    static async handlePollAboutToStartJob(job) {
        console.log(Events.POLL_ABOUT_TO_START + ' job running')

        try {
            const polls = await PollService.getPollsAboutToStart()

            polls.forEach(async (poll) => {
                await PollAboutToStartNotification.createIfNotExists({
                    notificationType: Events.POLL_ABOUT_TO_START,
                    notificationTitle: 'Get Ready! 🕒',
                    notificationMessage: `Poll '${poll.question.substring(0, 10)}...' is about to start. Get ready to vote!`,
                    pollId: poll.id
                })
            })
        } catch (error) {
            console.error('Error sending sending notification for polls about to start:', error);
        }
    }

    static async handlePollStartedJob(job) {
        console.log(Events.POLL_STARTED + ' job running')

        try {
            const polls = await PollService.getPollsStarted()

            polls.forEach(async (poll) => {
                await PollAboutToStartNotification.createIfNotExists({
                    notificationType: Events.POLL_STARTED,
                    notificationTitle: 'It\'s Go Time! 🚦',
                    notificationMessage: `Voting is now open for '${poll.question.substring(0, 10)}...'. Dive in and make your choice count!`,
                    pollId: poll.id
                })
            })
        } catch (error) {
            console.error('Error sending sending notification for polls started:', error);
        }
    }

    static async handlePollAboutToEndJob(job) {
        console.log(Events.POLL_ABOUT_TO_END + ' job running')

        try {
            const polls = await PollService.getPollsAboutToEnd()

            polls.forEach(async (poll) => {
                await PollAboutToStartNotification.createIfNotExists({
                    notificationType: Events.POLL_ABOUT_TO_END,
                    notificationTitle: 'Last Call for Votes! ⏳',
                    notificationMessage: `Time's almost up for '${poll.question.substring(0, 10)}...'. Cast your votes before it closes!`,
                    pollId: poll.id
                })
            })
        } catch (error) {
            console.error('Error sending sending notification for polls about to end:', error);
        }
    }

    static async handlePollEndedJob(job) {
        console.log(Events.POLL_ENDED + ' job running')

        try {
            const polls = await PollService.getPollsEnded()

            polls.forEach(async (poll) => {
                await PollAboutToStartNotification.createIfNotExists({
                    notificationType: Events.POLL_ENDED,
                    notificationTitle: 'Poll Closed 🛑',
                    notificationMessage: `The poll '${poll.question.substring(0, 10)}...' has ended. Check out the results to see how it went!`,
                    pollId: poll.id
                })
            })
        } catch (error) {
            console.error('Error sending sending notification for polls ended:', error);
        }
    }
}

export default PollJobHandler;
