import agenda from "../lib/agenda";
import Events from "../lib/emitter/events";

const scheduler = {
  sendPasswordResetMail: async (data) => {
    await agenda.now(Events.PASSWORD_RESET, data);
  },
  sendWelcomeEmail: async (data) => {
    await agenda.now(Events.NEW_USER, data);
  }

}

export default scheduler