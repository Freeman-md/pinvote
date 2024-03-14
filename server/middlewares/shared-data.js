import appConfig from "../config/app";
import { processValidationErrors } from "../utils/helpers";
import NotificationService from '../services/notification-service'

export const sharedDataMiddleware = async (req, res, next) => {
    const errors = req.flash('errors');
    const info = req.flash('info');
    const formData = req.flash('formData');
    const user = req.session.user
    const notifications = await NotificationService.getUserNotifications(user)
    const notificationsCount = await NotificationService.getUserUnreadNotificationsCount(user)
  
    res.locals.errors = processValidationErrors(errors);
    res.locals.info = info.length > 0 ? info[0] : null;
    res.locals.formData = formData ? formData[0] : null;
    res.locals.authenticated = req.session.authenticated;
    res.locals.user = user;
    res.locals.app = {
      url: appConfig.env.appUrl
    };
    res.locals.csrfToken = req.csrfToken();
    res.locals.notifications = notifications
    res.locals.notificationsCount = notificationsCount
  
    next();
  };
  
  export default sharedDataMiddleware;
  