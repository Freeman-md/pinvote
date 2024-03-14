class PollJobHandler {
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
        console.log('handling poll started job')
        // const { pollId, pollQuestion, voterName } = job.attrs.data;

        try {
            // await VoteCastedNotification.create(pollId, pollQuestion, voterName);
        } catch (error) {
            console.error('Error sending sending notification for vote casted:', error);
        }
    }

    static async handlePollAboutToEndJob(job) {
        console.log('handling poll about to end job')
        // const { pollId, pollQuestion, voterName } = job.attrs.data;

        try {
            // await VoteCastedNotification.create(pollId, pollQuestion, voterName);
        } catch (error) {
            console.error('Error sending sending notification for vote casted:', error);
        }
    }

    static async handlePollEndedJob(job) {
        console.log('handling poll ended job')
        // const { pollId, pollQuestion, voterName } = job.attrs.data;

        try {
            // await VoteCastedNotification.create(pollId, pollQuestion, voterName);
        } catch (error) {
            console.error('Error sending sending notification for vote casted:', error);
        }
    }
}

export default PollJobHandler;
