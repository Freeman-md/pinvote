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
            console.log('Notification for this poll and type already exists.');
            // Handle the case where the notification exists as needed, perhaps returning null or the existing notification
            return null;
        }
    }
    

    static async send() {
        // TODO: send notification to users with websockets
    }
}

export default PollAboutToStartNotification