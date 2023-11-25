import agenda from "../lib/agenda";
import Events from "../lib/emitter/events";

const scheduler = {
  sendPasswordResetMail: async (data) => {
    await agenda.now(Events.SEND_PASSWORD_RESET_MAIL, data);
  },

}

export default scheduler