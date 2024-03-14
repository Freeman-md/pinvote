import Notification from "../models/notification"

class NotificationService {
    static async notificationExists(notificationType, entityId, entityType) {
        const count = await Notification.countDocuments({
            'type': notificationType,
            'entity.id': entityId,
            'entity.type': entityType,
        });
    
        return count > 0; // Returns true if the notification exists, false otherwise
    }
    
    static getUserNotifications = async (user) => {
        if (!user) {
            return []
        }

        const pollIds = user.polls;

        const notifications = await Notification.find({
            'entity.id': { $in: pollIds },
            'entity.type': 'Poll'
        }).sort({ updatedAt: -1 });

        return notifications;
    }

    static createNotification = async (data) => {
        return await Notification.create(data)
    }
    

    static markAsRead = async (notificationId) => {
        return await Notification.findByIdAndUpdate(notificationId, {
            readAt: Date.now()
        })
    }
}

export default NotificationService