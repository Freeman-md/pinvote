import { matchedData, validationResult } from "express-validator"
import NotificationService from "../services/notification-service"

class NotificationController {
    markAsRead = async (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(500).json({
                message: errors.errors.length > 0 ? errors.errors[0].msg : 'Error recording vote'
            })
        }

        try {
            const { id: notificationId } = matchedData(req)

            await NotificationService.markAsRead(notificationId)

            return res.status(201).json({
                message: 'Notification marked as read'
            })

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }
}

export default new NotificationController()