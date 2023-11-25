import agenda from "../lib/agenda";
import Events from "../lib/emitter/events";

const scheduler = {
  sendPasswordResetMail: async (data) => {
    const job = await agenda.now(Events.SEND_PASSWORD_RESET_MAIL, data);

    await job.remove()
  },

}

export default scheduler