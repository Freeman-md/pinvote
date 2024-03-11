import Events from "../lib/emitter/events"
import NotificationService from "../services/notification-service"

class PollCreatedNotification {
    static async create(userId, pollId, pollQuestion) {
        return NotificationService.createNotification({
            type: Events.POLL_CREATED,
            entity: {
                id: pollId,
                type: 'Poll'
            },
            data: {
                title: 'Your Poll is Live! 🚀',
                message: `Voilà! '${pollQuestion.substring(0, 10)}...' is live. Gather those votes! 📊`
            }
        })
    }

    static async send() {
        // TODO: send notification to owner of poll
    }
}

export default PollCreatedNotification