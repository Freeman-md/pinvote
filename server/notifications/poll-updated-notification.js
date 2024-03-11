import Events from "../lib/emitter/events"
import NotificationService from "../services/notification-service"

class PollUpdatedNotification {
    static async create(userId, pollId, pollQuestion) {
        return NotificationService.createNotification({
            type: Events.POLL_UPDATED,
            entity: {
                id: pollId,
                type: 'Poll'
            },
            data: {
                title: 'Poll Makeover! ✨',
                message: `Your poll just got a refresh: '${pollQuestion.substring(0, 10)}...'. Dive in to see what's new! 🕵️‍♂️`
            }
        })
    }

static async send() {
        // TODO: send notification to owner of poll
    }
}

export default PollUpdatedNotification