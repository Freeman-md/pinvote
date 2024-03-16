import { getWebSocketServer } from "../bin/websocket";
import Events from "../lib/emitter/events"
import NotificationService from "../services/notification-service"

class PollAboutToStartNotification {
    static NOTIFICATION_ENTITY_TYPE = 'Poll'

    static async createIfNotExists({ notificationType, notificationTitle, notificationMessage, pollId }) {
        const exists = await NotificationService.notificationExists(notificationType, pollId, this.NOTIFICATION_ENTITY_TYPE);

        if (!exists) {
            const notification = NotificationService.createNotification({
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

            this.send({ notificationType, notificationTitle, notificationMessage, pollId })

            return notification
        } else {
            console.log(`Notification of type "${notificationType}" for poll ID "${pollId}" already exists.`);

            return null;
        }
    }
    

    static async send({ notificationType, notificationTitle, notificationMessage, pollId }) {
        console.log('sending poll notification')
        
        const io = getWebSocketServer()

        io.emit('notification', {
            type: notificationType,
            title: notificationTitle,
            message: notificationMessage,
            entity: {
                id: pollId,
                type: 'Poll'
            },
            actionText: 'View Poll'
        })
    }
}

export default PollAboutToStartNotification