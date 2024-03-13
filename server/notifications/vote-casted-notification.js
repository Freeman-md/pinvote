import Events from "../lib/emitter/events"
import NotificationService from "../services/notification-service"

class VoteCastedNotification {
    static async create(pollId, pollQuestion, voterName) {
        return NotificationService.createNotification({
            type: Events.VOTE_CASTED,
            entity: {
                id: pollId,
                type: 'Poll'
            },
            data: {
                title: 'New Vote Alert! 🗳️',
                message: `${voterName || 'An anonymous user'} just cast their vote on your poll: ${pollQuestion.substring(0, 10)}...'. Check it out to see the latest standings! `
            }
        })
    }

    static async send() {
        // TODO: send notification to owner of poll
    }
}

export default VoteCastedNotification