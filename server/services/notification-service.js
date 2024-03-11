import Notification from "../models/notification"

class NotificationService {
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
}

export default NotificationService