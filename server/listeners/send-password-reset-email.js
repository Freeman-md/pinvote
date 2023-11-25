import scheduler from "../jobs/scheduler";
import emitter from "../lib/emitter";
import Events from "../lib/emitter/events";

emitter.on(Events.SEND_PASSWORD_RESET_MAIL, async (data) => {    
    await scheduler.sendPasswordResetMail(data)
})