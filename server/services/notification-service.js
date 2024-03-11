import Notification from "../models/notification"

class NotificationService {
    static createNotification = async (data) => {
        return await Notification.create(data)
    }
}

export default NotificationService