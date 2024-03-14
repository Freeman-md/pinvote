import Events from "../lib/emitter/events"
import NotificationService from "../services/notification-service"

class PollAboutToStartNotification {
    static NOTIFICATION_ENTITY_TYPE = 'Poll'

    static async createIfNotExists({ notificationType, notificationTitle, notificationMessage, pollId }) {
        const exists = await NotificationService.notificationExists(notificationType, pollId, this.NOTIFICATION_ENTITY_TYPE);

        if (!exists) {
            return NotificationService.createNotification({
                type: notificationType,
                entity: {
                    id: pollId,
                    type: this.NOTIFICATION_ENTITY_TYPE
                },
                data: {
                    title: notificationTitle,
                    message: notificationMessage
                }
            });
        } else {
            console.log(`Notification of type "${notificationType}" for poll ID "${pollId}" already exists.`);

            return null;
        }
    }
    

    static async send() {
        // TODO: send notification to users with websockets
    }
}

export default PollAboutToStartNotification